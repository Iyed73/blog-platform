import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '@blog-platform/common';


@Entity()
@ObjectType()
export class BlogPost extends BaseEntity {
  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;
}
