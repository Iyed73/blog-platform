import { Module } from '@nestjs/common';
import { BlogPostsModule } from '@blog-platform/blog-posts';
import { CoreModule } from '@blog-platform/core';

@Module({
  imports: [CoreModule, BlogPostsModule],
})
export class AppModule {
}
