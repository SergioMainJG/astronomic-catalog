import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Comet } from './entities/comet.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class CometsService {
  constructor(
    @InjectRepository(Comet)
    private cometRepository: Repository<Comet>,
    private dataSource: DataSource,
  ) { }

  async create(createCometDto: any): Promise<Comet> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const celestialObject = new CelestialObject();
      celestialObject.globalName = createCometDto.globalName;
      celestialObject.description = createCometDto.description;
      celestialObject.imageUrl = createCometDto.imageUrl;
      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const comet = new Comet();
      comet.id = savedCelestialObject.id;
      comet.typeId = createCometDto.typeId;
      comet.celestialObject = savedCelestialObject;

      const savedComet = await queryRunner.manager.save(Comet, comet);
      await queryRunner.commitTransaction();
      return savedComet;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Comet[]> {
    return this.cometRepository.find();
  }

  async findOne(id: number): Promise<Comet> {
    const comet = await this.cometRepository.findOne({ where: { id } });
    if (!comet) {
      throw new NotFoundException(`Comet with ID ${id} not found`);
    }
    return comet;
  }
}
