import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BlackHole } from './entities/blackhole.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Injectable()
export class BlackholesService {
  constructor(
    @InjectRepository(BlackHole)
    private blackHoleRepository: Repository<BlackHole>,
    @InjectRepository(CelestialObject) // We might need this repo for direct updates if needed, but cascade should handle creation
    private celestialObjectRepository: Repository<CelestialObject>,
    private dataSource: DataSource,
  ) { }

  async create(createBlackHoleDto: any): Promise<BlackHole> {
    // Transactional creation to ensure consistency
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existing = await this.dataSource.manager.findOne(CelestialObject, {
        where: { globalName: createBlackHoleDto.globalName },
      });
      if (existing) {
        throw new ConflictException('Celestial object with this name already exists');
      }

      const celestialObject = new CelestialObject();
      celestialObject.globalName = createBlackHoleDto.globalName;
      celestialObject.description = createBlackHoleDto.description;
      celestialObject.imageUrl = createBlackHoleDto.imageUrl;

      const savedCelestialObject = await queryRunner.manager.save(celestialObject);

      const blackHole = new BlackHole();
      blackHole.id = savedCelestialObject.id;
      blackHole.massSolar = createBlackHoleDto.massSolar;
      blackHole.celestialObject = savedCelestialObject;

      const savedBlackHole = await queryRunner.manager.save(BlackHole, blackHole);

      await queryRunner.commitTransaction();
      return savedBlackHole;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll(): Promise<BlackHole[]> {
    return this.blackHoleRepository.find();
  }

  async findOne(id: number): Promise<BlackHole> {
    const blackHole = await this.blackHoleRepository.findOne({ where: { id } });
    if (!blackHole) {
      throw new NotFoundException(`BlackHole with ID ${id} not found`);
    }
    return blackHole;
  }

  async update(id: number, updateBlackHoleDto: any): Promise<BlackHole> {
    const blackHole = await this.findOne(id);

    // Update base properties
    if (updateBlackHoleDto.globalName) blackHole.celestialObject.globalName = updateBlackHoleDto.globalName;
    if (updateBlackHoleDto.description) blackHole.celestialObject.description = updateBlackHoleDto.description;
    if (updateBlackHoleDto.imageUrl) blackHole.celestialObject.imageUrl = updateBlackHoleDto.imageUrl;

    // Update specific properties
    if (updateBlackHoleDto.massSolar) blackHole.massSolar = updateBlackHoleDto.massSolar;

    await this.celestialObjectRepository.save(blackHole.celestialObject);
    return this.blackHoleRepository.save(blackHole);
  }

  async remove(id: number): Promise<void> {
    const blackHole = await this.findOne(id);
    // Because of foreign key constraints and cascade (if configured in DB), deleting parent might be enough, 
    // but here we hold the child. Deleting the base object is usually cleaner if cascade delete is set in DB.
    // In our entity we set onDelete: 'CASCADE' for the OneToOne, so deleting the BlackHole entity might not delete the CelestialObject? 
    // Wait, the FK is on BlackHole(id) -> CelestialObject(id).
    // If we delete CelestialObject, BlackHole should go.
    // If we delete BlackHole, CelestialObject stays? That's weird for a "subtype".
    // We should delete the CelestialObject.

    await this.celestialObjectRepository.remove(blackHole.celestialObject);
  }
}
