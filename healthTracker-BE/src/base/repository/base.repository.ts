import {
  Op,
  type FindOptions,
  type Includeable,
  type Model,
  type ModelStatic,
} from 'sequelize';
import { type BaseRepositoryInterface } from '../interface/baseRepository.js';

class BaseRepository<T extends Model> implements BaseRepositoryInterface<T> {
  constructor(public entity: ModelStatic<T>) {}
  deleteByEntity = async (entity: T): Promise<T> => {
    await entity.destroy();
    return entity;
  };
  deleteById = async (id: string): Promise<number> => {
    const record = await this.entity.destroy({
      where: {
        id: id,
      } as any,
    });
    return record;
  };
  findAllByAssociation = async (
    associationList: Includeable[]
  ): Promise<T[]> => {
    return await this.entity.findAll({ include: associationList });
  };
  deleteAllEntityById = async (ids: (string | number)[]): Promise<number> => {
    const record = await this.entity.destroy({
      where: {
        id: {
          [Op.eq]: ids,
        } as any,
      },
    });
    return record;
  };
  deleteAllByEntity = async (entityList: T[]): Promise<T[]> => {
    const promises = entityList.map((entity) => entity.destroy());
    await Promise.all(promises);
    return entityList;
  };
  findAll = async (criteria?: FindOptions): Promise<T[]> => {
    const records = await this.entity.findAll(criteria);
    return records;
  };
  findAllNested = async (): Promise<T[]> => {
    return this.entity.findAll({ include: { all: true, nested: true } });
  };
  findById = async (id: string): Promise<T | null> => {
    const record = this.entity.findByPk(id);
    return record;
  };
  findNestedById = async (id: string): Promise<T | null> => {
    const record = this.entity.findByPk(id, {
      include: { all: true, nested: true },
    });
    return record;
  };
  saveEntity = async (entity: T['_creationAttributes']): Promise<T> => {
    const dbEntity = await this.entity.create(entity, {
      include: { all: true, nested: true },
    });
    return dbEntity;
  };
  saveAllEntitty = async (
    entityList: T['_creationAttributes'][]
  ): Promise<T[]> => {
    const promises = entityList.map((entity) => {
      return this.entity.create(entity, {
        include: { all: true, nested: true },
      });
    });
    const records = await Promise.all(promises);
    return records;
  };
}

export { BaseRepository };
