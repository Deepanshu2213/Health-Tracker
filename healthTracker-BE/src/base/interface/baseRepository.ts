import type { FindOptions, Includeable, Model } from 'sequelize';

export interface BaseRepositoryInterface<T extends Model> {
  findById(id: string): Promise<T | null>;
  findAll(criteria?: FindOptions): Promise<T[]>;
  saveEntity(entity: T): Promise<T>;
  saveAllEntitty(entityList: T[]): Promise<T[]>;
  deleteByEntity(entity: T): Promise<T>;
  deleteById(id: string): Promise<number>;
  deleteAllEntityById(ids: string[]): Promise<number>;
  deleteAllByEntity(entityList: T[]): Promise<T[]>;
  findAllNested(): Promise<T[]>;
  findAllByAssociation(associationList: Includeable[]): Promise<T[]>;
}
