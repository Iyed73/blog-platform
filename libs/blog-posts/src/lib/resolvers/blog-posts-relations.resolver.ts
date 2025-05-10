import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { BlogPostModel } from '../graphql-models/blog-post.model';
import { CategoryModel } from '../graphql-models/category.model';
import { CategoriesByBlogPostLoader } from '../data-loader/categories-by-blog-post.loader';

@Resolver(() => BlogPostModel)
export class BlogPostsRelationsResolver {
  constructor(
    private readonly categoriesByBlogPostLoader: CategoriesByBlogPostLoader,
  ) {
  }

  @ResolveField('categories', () => [CategoryModel])
  async getCategoriesOfBlogPost(@Parent() blogPost: BlogPostModel): Promise<CategoryModel[]> {
    return this.categoriesByBlogPostLoader.load(blogPost.id);
  }

}
