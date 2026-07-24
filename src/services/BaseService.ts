import {
  Repository,
  EntitySchema,
  type DeepPartial,
  type FindOptionsWhere,
} from "typeorm";
import { AppDataSource } from "../data-source";

export class BaseService<T extends object> {
  protected repository: Repository<T>;

  constructor(schema: EntitySchema<T>) {
    this.repository = AppDataSource.getRepository<T>(schema);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(where?: FindOptionsWhere<T>): Promise<T[]> {
    return where ? await this.repository.find({ where }) : await this.repository.find();
  }

  async findById(id: number): Promise<T | null> {
    const where: FindOptionsWhere<T> = { id } as unknown as FindOptionsWhere<T>;
    return (await this.repository.findOne({ where })) ?? null;
  }

  async findByField(field: keyof T, value: unknown): Promise<T | null> {
    const where: FindOptionsWhere<T> = { [field]: value } as unknown as FindOptionsWhere<T>;
    return (await this.repository.findOne({ where })) ?? null;
  }

  async updateById(id: number, data: DeepPartial<T>): Promise<T | null> {
    const where: FindOptionsWhere<T> = { id } as unknown as FindOptionsWhere<T>;
    const result = await this.repository.update(where, data as any);

    if (result.affected === 0) return null;
    return (await this.repository.findOne({ where })) ?? null;
  }

  async deleteById(id: number): Promise<{ success: boolean }> {
    const result = await this.repository.delete({ id } as any);
    return { success: !!(result.affected && result.affected > 0) };
  }
}
