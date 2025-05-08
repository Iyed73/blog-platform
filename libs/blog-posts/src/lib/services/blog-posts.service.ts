import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from '../entities/blog-post.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '@blog-platform/common';


@Injectable()
export class BlogPostsService extends BaseCrudService<BlogPost> {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>
  ) {
    super(blogPostRepository);
  }
}

