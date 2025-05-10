import { DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { PaginationQueryInput } from '../dto/pagination-query.dto';
import { CustomLogger } from '../logger/custom-logger.service';

@Injectable()
export abstract class BaseCrudService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>,
              protected readonly logger: CustomLogger) {
  }

  protected get entityName(): string {
    return this.repository.metadata.targetName;
  }

  async findAll(paginationQuery: PaginationQueryInput): Promise<T[]> {
    const { limit, offset } = paginationQuery || {};
    this.logger.log(`Finding all ${this.entityName}s with pagination: ${JSON.stringify(paginationQuery)}`);
    const order: FindOptionsOrder<T> = { createdAt: 'DESC' } as FindOptionsOrder<T>;
    const result = await this.repository.find({
      skip: offset,
      take: limit,
      order
    });
    this.logger.log(`Found ${result.length} ${this.entityName}s`);
    return result;
  }

  async findOne(id: number): Promise<T> {
    this.logger.log(`Finding ${this.entityName} with ID ${id}`);
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>
    });

    if (!entity) {
      this.logger.warn(`${this.entityName} not found`);
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }
    this.logger.log(`${this.entityName} with ID ${id} found`);

    return entity;
  }

  async create(createDto: DeepPartial<T>): Promise<T> {
    this.logger.log(`Creating new ${this.entityName}`);
    const newEntity = this.repository.create(createDto);
    const result = await this.repository.save(newEntity)
    this.logger.log(`Created new ${this.entityName}, ID: ${result.id}`);
    return result;
  }

  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    this.logger.log(`Updating ${this.entityName} with ID ${id}`);
    const entity = await this.repository.preload({
      id,
      ...updateDto
    } as DeepPartial<T>);

    if (!entity) {
      this.logger.warn(`${this.entityName} with ID ${id} not found`);
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }
    const result = await this.repository.save(entity);
    this.logger.log(`Updated ${this.entityName} with ID ${result.id}`);
    return result;
  }

  async remove(id: number): Promise<T> {
    const entity = await this.findOne(id);
    return this.repository.remove(entity);
  }

  async softDelete(id: number): Promise<boolean> {
    this.logger.log(`Soft deleting ${this.entityName} with ID ${id}`);
    const result = await this.repository.softDelete(id);

    if (result.affected === 0) {
      this.logger.warn(`${this.entityName} with ID ${id} not found`);
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }
    this.logger.log(`${this.entityName} with ID ${id} soft deleted successfully. `);

    return true;
  }
}
