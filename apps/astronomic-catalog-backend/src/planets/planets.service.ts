import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetRepository: Repository<Planet>,
    private dataSource: DataSource,
  ) { }

  async create(createPlanetDto: any): Promise<Planet> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existing = await this.dataSource.manager.findOne(CelestialObject, {
        where: { globalName: createPlanetDto.globalName },
      });
      if (existing) {
        throw new ConflictException('Celestial object with this name already exists');
      }

      const celestialObject = new CelestialObject();
      celestialObject.globalName = createPlanetDto.globalName;
      celestialObject.description = createPlanetDto.description;
      celestialObject.imageUrl = createPlanetDto.imageUrl;

      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const planet = new Planet();
      planet.id = savedCelestialObject.id;
      planet.planetTypeId = createPlanetDto.planetTypeId;
      planet.massEarth = createPlanetDto.massEarth;
      planet.radiusEarth = createPlanetDto.radiusEarth;
      planet.celestialObject = savedCelestialObject;

      const savedPlanet = await queryRunner.manager.save(Planet, planet);

      await queryRunner.commitTransaction();
      return savedPlanet;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Planet[]> {
    return this.planetRepository.find({ relations: ['celestialObject'] });
  }

  async findOne(id: number): Promise<Planet> {
    const planet = await this.planetRepository.findOne({ where: { id }, relations: ['celestialObject'] });
    if (!planet) {
      throw new NotFoundException(`Planet with ID ${id} not found`);
    }
    return planet;
  }
}
