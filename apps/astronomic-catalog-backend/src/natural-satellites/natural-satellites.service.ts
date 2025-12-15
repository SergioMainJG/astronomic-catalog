import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NaturalSatellite } from './entities/natural-satellite.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class NaturalSatellitesService {
  constructor(
    @InjectRepository(NaturalSatellite)
    private naturalSatelliteRepository: Repository<NaturalSatellite>,
    private dataSource: DataSource,
  ) { }

  async create(createNaturalSatelliteDto: any): Promise<NaturalSatellite> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const celestialObject = new CelestialObject();
      celestialObject.globalName = createNaturalSatelliteDto.globalName;
      celestialObject.description = createNaturalSatelliteDto.description;
      celestialObject.imageUrl = createNaturalSatelliteDto.imageUrl;
      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const naturalSatellite = new NaturalSatellite();
      naturalSatellite.id = savedCelestialObject.id;
      naturalSatellite.massSatellite = createNaturalSatelliteDto.massSatellite;
      naturalSatellite.radiusSatellite = createNaturalSatelliteDto.radiusSatellite;
      naturalSatellite.celestialObject = savedCelestialObject;

      const savedNaturalSatellite = await queryRunner.manager.save(NaturalSatellite, naturalSatellite);
      await queryRunner.commitTransaction();
      return savedNaturalSatellite;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<NaturalSatellite[]> {
    return this.naturalSatelliteRepository.find();
  }

  async findOne(id: number): Promise<NaturalSatellite> {
    const naturalSatellite = await this.naturalSatelliteRepository.findOne({ where: { id } });
    if (!naturalSatellite) {
      throw new NotFoundException(`NaturalSatellite with ID ${id} not found`);
    }
    return naturalSatellite;
  }
}
