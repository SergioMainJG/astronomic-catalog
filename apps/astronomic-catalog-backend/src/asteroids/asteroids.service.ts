import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Asteroid } from './entities/asteroid.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class AsteroidsService {
  constructor(
    @InjectRepository(Asteroid)
    private asteroidRepository: Repository<Asteroid>,
    private dataSource: DataSource,
  ) { }

  async create(createAsteroidDto: any): Promise<Asteroid> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const celestialObject = new CelestialObject();
      celestialObject.globalName = createAsteroidDto.globalName;
      celestialObject.description = createAsteroidDto.description;
      celestialObject.imageUrl = createAsteroidDto.imageUrl;
      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const asteroid = new Asteroid();
      asteroid.id = savedCelestialObject.id;
      asteroid.typeId = createAsteroidDto.typeId;
      asteroid.celestialObject = savedCelestialObject;

      const savedAsteroid = await queryRunner.manager.save(Asteroid, asteroid);
      await queryRunner.commitTransaction();
      return savedAsteroid;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Asteroid[]> {
    return this.asteroidRepository.find();
  }

  async findOne(id: number): Promise<Asteroid> {
    const asteroid = await this.asteroidRepository.findOne({ where: { id } });
    if (!asteroid) {
      throw new NotFoundException(`Asteroid with ID ${id} not found`);
    }
    return asteroid;
  }
}
