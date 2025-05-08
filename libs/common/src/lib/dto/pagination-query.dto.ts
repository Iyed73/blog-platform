import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';

@InputType()
export class PaginationQueryDto {
  @Field(() => Int, { nullable: true })
  @Min(1)
  @IsOptional()
  limit?: number;

  @Field(() => Int, { nullable: true })
  @Min(0)
  @IsOptional()
  offset?: number;
}
