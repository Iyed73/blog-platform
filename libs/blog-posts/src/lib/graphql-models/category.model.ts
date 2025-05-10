import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@blog-platform/common';
import { BlogPostModel } from './blog-post.model';
import { capitalizeMiddleware } from '@blog-platform/common';

@ObjectType()
export class CategoryModel extends BaseModel {
  @Field({ middleware: [capitalizeMiddleware] })
  name!: string;

  @Field(() => [BlogPostModel], { nullable: true })
  blogPosts?: BlogPostModel[];
}
