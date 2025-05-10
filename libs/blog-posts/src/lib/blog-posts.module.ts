import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { BlogPostsService } from './services/blog-posts.service';
import { BlogPostsResolver } from './resolvers/blog-posts.resolver';
import { CommonModule } from '@blog-platform/common';
import { Category } from './entities/category.entity';
import { BlogPostsRelationsResolver } from './resolvers/blog-posts-relations.resolver';
import { CategoriesByBlogPostLoader } from './data-loader/categories-by-blog-post.loader';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost, Category]), CommonModule],
  controllers: [],
  providers: [
    BlogPostsService,
    BlogPostsResolver,
    BlogPostsRelationsResolver,
    CategoriesByBlogPostLoader,
  ],
  exports: [],
})
export class BlogPostsModule {}
