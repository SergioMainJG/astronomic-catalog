import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Star } from './entities/star.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class StarsService {
  constructor(
    @InjectRepository(Star)
    private starRepository: Repository<Star>,
    private dataSource: DataSource,
  ) { }

  async create(createStarDto: any): Promise<Star> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const celestialObject = new CelestialObject();
      celestialObject.globalName = createStarDto.globalName;
      celestialObject.description = createStarDto.description;
      celestialObject.imageUrl = createStarDto.imageUrl;

      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const star = new Star();
      star.id = savedCelestialObject.id;
      star.constellationId = createStarDto.constellationId;
      star.systemId = createStarDto.systemId;
      star.spectralTypeId = createStarDto.spectralTypeId;
      star.massSolar = createStarDto.massSolar;
      star.radiusSolar = createStarDto.radiusSolar;
      star.celestialObject = savedCelestialObject;

      const savedStar = await queryRunner.manager.save(Star, star);

      await queryRunner.commitTransaction();
      return savedStar;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<Star[]> {
    return this.starRepository.find();
  }

  async findOne(id: number): Promise<Star> {
    const star = await this.starRepository.findOne({ where: { id } });
    if (!star) {
      throw new NotFoundException(`Star with ID ${id} not found`);
    }
    return star;
  }
}
