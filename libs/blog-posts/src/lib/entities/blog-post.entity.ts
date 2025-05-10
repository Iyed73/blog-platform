import {
  Column,
  Entity, JoinTable, ManyToMany
} from 'typeorm';
import { BaseEntity } from '@blog-platform/common';
import { Category } from './category.entity';


@Entity()
export class BlogPost extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  content!: string;

  @JoinTable()
  @ManyToMany(() => Category, (category) => category.blogPosts)
  categories?: Category[];
}
