import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Resolver, Query, Mutation } from '@nestjs/graphql';
import { BlogPostsService } from '../services/blog-posts.service';
import { BlogPost } from '../entities/blog-post.entity';
import { CreateBlogPostInput } from '../dto/create-blog-post.input';
import { UpdateBlogPostInput } from '../dto/update-blog-post.input';
import { PaginationQueryDto } from '@blog-platform/common';

@Resolver()
export class BlogPostsResolver {
  constructor(
    private readonly blogPostService: BlogPostsService
  ) {
  }

  @Query(() => [BlogPost], { name: 'blogPosts' })
  async findAll(@Args('paginationQuery', { nullable: true }) paginationQuery: PaginationQueryDto) {
    return this.blogPostService.findAll(paginationQuery);
  }

  @Query(() => BlogPost, { name: 'blogPost' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.blogPostService.findOne(id);
  }

  @Mutation(() => BlogPost, { name: 'createBlogPost' })
  async create(
    @Args('createBlogPostInput') createBlogPostInput: CreateBlogPostInput
  ) {
    return this.blogPostService.create(createBlogPostInput);
  }

  @Mutation(() => BlogPost, { name: 'updateBlogPost' })
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateBlogPostInput') updateBlogPostInput: UpdateBlogPostInput
  ) {
    return this.blogPostService.update(id, updateBlogPostInput);
  }

  @Mutation(() => BlogPost, { name: 'removeBlogPost' })
  async remove(@Args('id', ParseIntPipe) id: number) {
    return this.blogPostService.softDelete(id);
  }
}
