import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../entities/blog-post.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@blog-platform/common';
import { PubSub } from 'graphql-subscriptions';
import { CreateBlogPostInput } from '../dto/create-blog-post.input';
import { BLOG_POST_ADDED_EVENT } from '../constants';


@Injectable()
export class BlogPostsService extends BaseCrudService<BlogPost> {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
    private readonly pubSub: PubSub,
  ) {
    super(blogPostRepository);
  }

  override async create(createBlogPostInput: CreateBlogPostInput): Promise<BlogPost> {
    const blogPost = this.repository.create(createBlogPostInput);
    const newBlogPost = await this.blogPostRepository.save(blogPost);
    this.pubSub.publish(BLOG_POST_ADDED_EVENT, { blogPostAdded: newBlogPost });
    return newBlogPost;
  }
}

