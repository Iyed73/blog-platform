import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@blog-platform/common';
import { CategoryModel } from './category.model';


@ObjectType()
export class BlogPostModel extends BaseModel {
  @Field()
  title!: string;

  @Field()
  content!: string;

  @Field(() => [CategoryModel], { nullable: 'itemsAndList' })
  categories?: CategoryModel[];
}
