import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { BlogPostsService } from './services/blog-posts.service';
import { BlogPostsResolver } from './resolvers/blog-posts.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [],
  providers: [
    BlogPostsService,
    BlogPostsResolver,
  ],
  exports: [],
})
export class BlogPostsModule {}
