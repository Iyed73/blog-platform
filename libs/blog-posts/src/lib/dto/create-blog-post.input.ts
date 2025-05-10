import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateBlogPostInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Title is too short (min: 5 characters)' })
  @MaxLength(100, { message: 'Title is too long (max: 100 characters)' })
  title!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Content is too short (min: 5 characters)' })
  @MaxLength(10000, { message: 'Content is too long (max: 10000 characters)' })
  content!: string;
}
