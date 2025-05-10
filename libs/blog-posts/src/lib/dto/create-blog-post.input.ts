import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateBlogPostInput {
  @Field()
  @MinLength(5, { message: 'Title is too short (min: 5 characters)' })
  @MaxLength(100, { message: 'Title is too long (max: 100 characters)' })
  title!: string;

  @Field()
  @MinLength(5, { message: 'Content is too short (min: 5 characters)' })
  @MaxLength(10000, { message: 'Content is too long (max: 10000 characters)' })
  content!: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @MinLength(2, {
    each: true,
    message: 'Each category must be at least 2 characters long'
  })
  categories?: string[];
}
