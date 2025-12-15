import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { StarCluster } from './entities/star-cluster.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class StarClustersService {
  constructor(
    @InjectRepository(StarCluster)
    private starClusterRepository: Repository<StarCluster>,
    private dataSource: DataSource,
  ) { }

  async create(createStarClusterDto: any): Promise<StarCluster> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existing = await this.dataSource.manager.findOne(CelestialObject, {
        where: { globalName: createStarClusterDto.globalName },
      });
      if (existing) {
        throw new ConflictException('Celestial object with this name already exists');
      }

      const celestialObject = new CelestialObject();
      celestialObject.globalName = createStarClusterDto.globalName;
      celestialObject.description = createStarClusterDto.description;
      celestialObject.imageUrl = createStarClusterDto.imageUrl;
      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const starCluster = new StarCluster();
      starCluster.id = savedCelestialObject.id;
      starCluster.galaxyId = createStarClusterDto.galaxyId;
      starCluster.celestialObject = savedCelestialObject;

      const savedStarCluster = await queryRunner.manager.save(StarCluster, starCluster);
      await queryRunner.commitTransaction();
      return savedStarCluster;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<StarCluster[]> {
    return this.starClusterRepository.find();
  }

  async findOne(id: number): Promise<StarCluster> {
    const starCluster = await this.starClusterRepository.findOne({ where: { id } });
    if (!starCluster) {
      throw new NotFoundException(`StarCluster with ID ${id} not found`);
    }
    return starCluster;
  }
}
