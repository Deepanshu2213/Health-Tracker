import type { FindOptions, Includeable } from 'sequelize';

export interface BaseServiceInterface<E> {
  getAllEntity(criteria?: FindOptions): Promise<E[]>;
  saveEntity(entity: E): Promise<E>;
  getEntityById(id: string): Promise<E | null>;
  saveAllEntity(entityList: E[]): Promise<E[]>;
  deleteEntityById(id: string): Promise<Number>;
  getAllNested(): Promise<E[]>;
  findAllByAssociation(associationList: Includeable[]): Promise<E[]>;
}
