import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { CategoryModel } from '../graphql-models/category.model';
import { Category } from '../entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BlogPost } from '../entities/blog-post.entity';

@Injectable({ scope: Scope.REQUEST })
export class CategoriesByBlogPostLoader extends DataLoader<number, CategoryModel[]> {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {
    super(keys => this.batchLoadFn(keys));
  }

  private async batchLoadFn(blogPostIds: readonly number[]): Promise<Category[][]> {
    const blogPostsWithCategories = await this.blogPostRepository.find({
      select: ['id'],
      relations: {
        categories: true,
      },
      where: {
        id: In(blogPostIds as number[]),
      },
    });
    return blogPostsWithCategories.map((blogPost) => blogPost.categories || []);
  }
}
