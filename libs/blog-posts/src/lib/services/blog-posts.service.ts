import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../entities/blog-post.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { CustomLogger, PaginationQueryInput } from '@blog-platform/common';
import { PubSub } from 'graphql-subscriptions';
import { CreateBlogPostInput } from '../dto/create-blog-post.input';
import { BLOG_POST_ADDED_EVENT } from '../constants';
import { UpdateBlogPostInput } from '../dto/update-blog-post.input';
import { Category } from '../entities/category.entity';
import { EntityNotFoundException } from '@blog-platform/common';


@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly pubSub: PubSub,
    private readonly logger: CustomLogger
  ) {
    logger.setContext('blogPostsService');
  }

  async findAll(paginationQuery: PaginationQueryInput): Promise<BlogPost[]> {
    const { limit, offset } = paginationQuery || {};
    this.logger.log(`Finding all blog posts with pagination: ${JSON.stringify(paginationQuery)}`);
    const order: FindOptionsOrder<BlogPost> = { createdAt: 'DESC' } as FindOptionsOrder<BlogPost>;
    const result = await this.blogPostRepository.find({
      skip: offset,
      take: limit,
      order
    });
    this.logger.log(`Found ${result.length} blogPost(s)`);
    return result;
  }

  async findOne(id: number): Promise<BlogPost> {
    this.logger.log(`Finding blog post with ID ${id}`);
    const blogPost = await this.blogPostRepository.findOne({
      where: { id } as FindOptionsWhere<BlogPost>
    });

    if (!blogPost) {
      this.logger.warn(`Blog post not found`);
      throw new EntityNotFoundException('Blog post', id);
    }
    this.logger.log(`Blog post with ID ${id} found`);

    return blogPost;
  }

  async create(createBlogPostInput: CreateBlogPostInput): Promise<BlogPost> {
    this.logger.log(`Creating blog post with title ${createBlogPostInput.title}`);
    try {
      const names = createBlogPostInput.categories ?? [];
      const categories = await Promise.all(
        names.map((name) => this.preloadCategoryByName(name))
      );

      const blogPost = this.blogPostRepository.create({ ...createBlogPostInput, categories });
      const newBlogPost = await this.blogPostRepository.save(blogPost);
      this.pubSub.publish(BLOG_POST_ADDED_EVENT, { blogPostAdded: newBlogPost });
      this.logger.log(`Blog post created successfully: ID=${newBlogPost.id}, Title=${newBlogPost.title}`);
      return newBlogPost;
    } catch (error) {
      this.logger.warn(`Blog post creation failed: ${error}`);
      throw error;
    }
  }

  async update(id: number, updateBlogPostInput: UpdateBlogPostInput): Promise<BlogPost> {
    this.logger.log(`Updating blog post with title ${updateBlogPostInput.title}`);
    const categories =
      updateBlogPostInput.categories &&
      (await Promise.all(
        updateBlogPostInput.categories.map((name) => this.preloadCategoryByName(name))
      ));
    const blogPost = await this.blogPostRepository.preload({
      id,
      ...updateBlogPostInput,
      categories
    });
    if (!blogPost) {
      this.logger.warn(`Blog post update failed: blog post with ID ${id} not found`);
      throw new EntityNotFoundException('Blog post', id);
    }
    const result = await this.blogPostRepository.save(blogPost);
    this.logger.log(`Blog post updated successfully: ID=${result}`);
    return result;
  }

  private async preloadCategoryByName(name: string): Promise<Category> {
    this.logger.log(`Preloading category: ${name}`);
    const existingCategory = await this.categoryRepository.findOne({
      where: { name }
    });
    if (!existingCategory) {
      this.logger.log(`Creating new category ${name}`);
      const newCategory = await this.categoryRepository.create({ name });
      const result = this.categoryRepository.save(newCategory);
      this.logger.log(`Category ${name} created successfully`);
      return result;
    }
    this.logger.log(`Category ${name} is found in the database`);
    return existingCategory;
  }

  async softDelete(id: number): Promise<boolean> {
    this.logger.log(`Soft deleting blog post with ID ${id}`);

    const existing = await this.blogPostRepository.findOne({ where: { id } });
    if (!existing) {
      this.logger.warn(`Cannot delete blog post: no post found with ID ${id}`);
      throw new EntityNotFoundException('Blog post', id);
    }

    await this.blogPostRepository.softDelete(id);

    this.logger.log(`Blog post with ID ${id} soft deleted successfully. `);

    return true;
  }
}

