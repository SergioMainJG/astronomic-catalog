import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Nebula } from './entities/nebula.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class NebulasService {
  constructor(
    @InjectRepository(Nebula)
    private nebulaRepository: Repository<Nebula>,
    private dataSource: DataSource,
  ) { }

  async create(createNebulaDto: any): Promise<Nebula> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const celestialObject = new CelestialObject();
      celestialObject.globalName = createNebulaDto.globalName;
      celestialObject.description = createNebulaDto.description;
      celestialObject.imageUrl = createNebulaDto.imageUrl;
      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const nebula = new Nebula();
      nebula.id = savedCelestialObject.id;
      nebula.neighborhoodId = createNebulaDto.neighborhoodId;
      nebula.celestialObject = savedCelestialObject;

      const savedNebula = await queryRunner.manager.save(Nebula, nebula);
      await queryRunner.commitTransaction();
      return savedNebula;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Nebula[]> {
    return this.nebulaRepository.find();
  }

  async findOne(id: number): Promise<Nebula> {
    const nebula = await this.nebulaRepository.findOne({ where: { id } });
    if (!nebula) {
      throw new NotFoundException(`Nebula with ID ${id} not found`);
    }
    return nebula;
  }
}
