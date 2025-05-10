import { BaseEntity } from '@blog-platform/common';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BlogPost } from './blog-post.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name!: string;

  @ManyToMany((type) => BlogPost, (blogPost) => blogPost.categories)
  blogPosts!: BlogPost[];
}
