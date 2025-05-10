import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '@blog-platform/common';


@Entity()
export class BlogPost extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  content!: string;
}
