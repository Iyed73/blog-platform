import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@blog-platform/common';
import { BlogPostModel } from './blog-post.model';

@ObjectType()
export class CategoryModel extends BaseModel {
  @Field()
  name!: string;

  @Field(() => [BlogPostModel], { nullable: true })
  blogPosts?: BlogPostModel[];
}
