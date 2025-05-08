import { DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

@Injectable()
export abstract class BaseCrudService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {
  }

  protected get entityName(): string {
    return this.repository.metadata.targetName;
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<T[]> {
    const { limit, offset } = paginationQuery || {};
    const order: FindOptionsOrder<T> = { createdAt: 'DESC' } as FindOptionsOrder<T>;
    return this.repository.find({
      skip: offset,
      take: limit,
      order,
    });
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>
    });

    if (!entity) {
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }

    return entity;
  }

  async create(createDto: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(createDto);
    return this.repository.save(newEntity);
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.preload({
      id,
      ...updateDto
    } as DeepPartial<T>);

    if (!entity) {
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }

    return this.repository.save(entity);
  }

  async remove(id: number): Promise<T> {
    const entity = await this.findOne(id);
    return this.repository.remove(entity);
  }

  async softDelete(id: number): Promise<void> {
    const result = await this.repository.softDelete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }
  }
}
