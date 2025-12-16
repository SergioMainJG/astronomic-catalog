import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarSystem } from './entities/star-system.entity';

@Injectable()
export class StellarSystemsService {
  constructor(
    @InjectRepository(StarSystem)
    private starSystemRepository: Repository<StarSystem>,
  ) { }

  async create(createStarSystemDto: any): Promise<StarSystem> {
    const existing = await this.starSystemRepository.findOne({ where: { name: createStarSystemDto.name } });
    if (existing) {
      throw new ConflictException('Star System with this name already exists');
    }
    const starSystem = this.starSystemRepository.create(createStarSystemDto) as unknown as StarSystem;
    return this.starSystemRepository.save(starSystem);
  }

  findAll(): Promise<StarSystem[]> {
    return this.starSystemRepository.find({ relations: ['neighborhood', 'stars'] });
  }

  async findOne(id: number): Promise<StarSystem> {
    const starSystem = await this.starSystemRepository.findOne({ where: { id }, relations: ['neighborhood', 'stars'] });
    if (!starSystem) {
      throw new NotFoundException(`StarSystem with ID ${id} not found`);
    }
    console.log({ starSystem });
    return starSystem;
  }

  async update(id: number, updateStarSystemDto: any): Promise<StarSystem> {
    const starSystem = await this.findOne(id);
    Object.assign(starSystem, updateStarSystemDto);
    return this.starSystemRepository.save(starSystem);
  }

  async remove(id: number): Promise<void> {
    const result = await this.starSystemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`StarSystem with ID ${id} not found`);
    }
  }
}
