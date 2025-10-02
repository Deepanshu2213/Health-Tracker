import type { Includeable, Model } from 'sequelize';
import type { BaseRepositoryInterface } from '../interface/baseRepository.js';
import type { BaseServiceInterface } from '../interface/BaseServiceInterface.js';

export class BaseService<E extends Model> implements BaseServiceInterface<E> {
  constructor(public repository: BaseRepositoryInterface<E>) {}
  getAllNested = async (): Promise<E[]> => {
    const data = await this.repository.findAllNested();
    return data;
  };
  getEntityById = async (id: string): Promise<E | null> => {
    const data = await this.repository.findById(id);
    return data;
  };
  getAllEntity = async (): Promise<E[]> => {
    const data = await this.repository.findAll();
    return data;
  };
  saveEntity = async (entity: E): Promise<E> => {
    const data = await this.repository.saveEntity(entity);
    return data;
  };
  findAllByAssociation = async (
    associationList: Includeable[]
  ): Promise<E[]> => {
    const data = await this.repository.findAllByAssociation(associationList);
    return data;
  };
  saveAllEntity = async (entityList: E[]): Promise<E[]> => {
    const data = await this.repository.saveAllEntitty(entityList);
    return data;
  };
  deleteEntityById = async (id: string): Promise<Number> => {
    const data = await this.repository.deleteById(id);
    return data;
  };
}
