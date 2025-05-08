import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @Field()
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  @Field({
    nullable: true,
  })
  deletedAt?: Date;
}
