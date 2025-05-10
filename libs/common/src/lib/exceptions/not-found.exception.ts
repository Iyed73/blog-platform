import { NotFoundException } from '@nestjs/common';

export interface EntityNotFoundMetadata {
  entityName: string;
  entityId: number | string;
}

export class EntityNotFoundException extends NotFoundException {
  readonly metadata: EntityNotFoundMetadata;

  constructor(entityName: string, entityId: number | string) {
    super(`${entityName} not found with id ${entityId}`);
    this.metadata = { entityName, entityId };
  }
}
