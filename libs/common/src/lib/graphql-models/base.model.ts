import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID, {
    nullable: false,
  })
  id: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({
    nullable: true,
  })
  deletedAt?: Date;
}
