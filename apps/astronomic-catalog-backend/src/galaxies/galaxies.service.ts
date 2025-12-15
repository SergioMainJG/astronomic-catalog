import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Galaxy } from './entities/galaxy.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class GalaxiesService {
  constructor(
    @InjectRepository(Galaxy)
    private galaxyRepository: Repository<Galaxy>,
    @InjectRepository(CelestialObject)
    private celestialObjectRepository: Repository<CelestialObject>,
    private dataSource: DataSource,
  ) { }

  async create(createGalaxyDto: any): Promise<Galaxy> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existing = await this.dataSource.manager.findOne(CelestialObject, {
        where: { globalName: createGalaxyDto.globalName },
      });
      if (existing) {
        throw new ConflictException('Celestial object with this name already exists');
      }

      const celestialObject = new CelestialObject();
      celestialObject.globalName = createGalaxyDto.globalName;
      celestialObject.description = createGalaxyDto.description;
      celestialObject.imageUrl = createGalaxyDto.imageUrl;

      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const galaxy = new Galaxy();
      galaxy.id = savedCelestialObject.id;
      galaxy.galaxyTypeId = createGalaxyDto.galaxyTypeId;
      galaxy.distanceMly = createGalaxyDto.distanceMly;
      galaxy.celestialObject = savedCelestialObject;

      const savedGalaxy = await queryRunner.manager.save(Galaxy, galaxy);

      await queryRunner.commitTransaction();
      return savedGalaxy;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Galaxy[]> {
    return this.galaxyRepository.find();
  }

  async findOne(id: number): Promise<Galaxy> {
    const galaxy = await this.galaxyRepository.findOne({ where: { id } });
    if (!galaxy) {
      throw new NotFoundException(`Galaxy with ID ${id} not found`);
    }
    return galaxy;
  }

  async update(id: number, updateGalaxyDto: any): Promise<Galaxy> {
    const galaxy = await this.findOne(id);

    if (updateGalaxyDto.globalName) galaxy.celestialObject.globalName = updateGalaxyDto.globalName;
    if (updateGalaxyDto.description) galaxy.celestialObject.description = updateGalaxyDto.description;
    if (updateGalaxyDto.imageUrl) galaxy.celestialObject.imageUrl = updateGalaxyDto.imageUrl;

    if (updateGalaxyDto.galaxyTypeId) galaxy.galaxyTypeId = updateGalaxyDto.galaxyTypeId;
    if (updateGalaxyDto.distanceMly) galaxy.distanceMly = updateGalaxyDto.distanceMly;

    await this.celestialObjectRepository.save(galaxy.celestialObject);
    return this.galaxyRepository.save(galaxy);
  }

  async remove(id: number): Promise<void> {
    const galaxy = await this.findOne(id);
    await this.celestialObjectRepository.remove(galaxy.celestialObject);
  }
}
