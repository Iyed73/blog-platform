import { ParseIntPipe, UseFilters } from '@nestjs/common';
import { Args, ID, Resolver, Query, Mutation, Subscription } from '@nestjs/graphql';
import { BlogPostsService } from '../services/blog-posts.service';
import { CreateBlogPostInput } from '../dto/create-blog-post.input';
import { UpdateBlogPostInput } from '../dto/update-blog-post.input';
import { GraphqlExceptionsFilter, PaginationQueryInput } from '@blog-platform/common';
import { PubSub } from 'graphql-subscriptions';
import { BLOG_POST_ADDED_EVENT } from '../constants';
import { BlogPostModel } from '../graphql-models/blog-post.model';

@Resolver()
@UseFilters(GraphqlExceptionsFilter)
export class BlogPostsResolver {
  constructor(
    private readonly blogPostService: BlogPostsService,
    private readonly pubSub: PubSub
  ) {
  }

  @Query(() => [BlogPostModel], { name: 'blogPosts' })
  async findAll(@Args('paginationQuery', { nullable: true }) paginationQuery: PaginationQueryInput) {
    return this.blogPostService.findAll(paginationQuery);
  }

  @Query(() => BlogPostModel, { name: 'blogPost' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.blogPostService.findOne(id);
  }

  @Mutation(() => BlogPostModel, { name: 'createBlogPost' })
  async create(
    @Args('createBlogPostInput') createBlogPostInput: CreateBlogPostInput
  ) {
    return this.blogPostService.create(createBlogPostInput);
  }

  @Mutation(() => BlogPostModel, { name: 'updateBlogPost' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateBlogPostInput') updateBlogPostInput: UpdateBlogPostInput
  ) {
    return this.blogPostService.update(id, updateBlogPostInput);
  }

  @Mutation(() => Boolean, { name: 'removeBlogPost' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.blogPostService.softDelete(id);
  }

  @Subscription(() => BlogPostModel)
  blogPostAdded() {
    return this.pubSub.asyncIterableIterator(BLOG_POST_ADDED_EVENT);
  }
}
