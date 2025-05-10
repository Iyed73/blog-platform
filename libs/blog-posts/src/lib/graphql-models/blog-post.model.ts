import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@blog-platform/common';


@ObjectType()
export class BlogPostModel extends BaseModel {
  @Field()
  title!: string;

  @Field()
  content!: string;
}
