import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orbit } from './entities/orbit.entity';

@Injectable()
export class JerarchyPlanetService {
  constructor(
    @InjectRepository(Orbit)
    private orbitRepository: Repository<Orbit>,
  ) { }

  create(createOrbitDto: any): Promise<Orbit> {
    const orbit = this.orbitRepository.create(createOrbitDto) as unknown as Orbit;
    return this.orbitRepository.save(orbit);
  }

  findAll(): Promise<Orbit[]> {
    return this.orbitRepository.find({ relations: ['celestialObject', 'primaryBody'] });
  }

  async findOne(id: number): Promise<Orbit> {
    const orbit = await this.orbitRepository.findOne({
      where: { id },
      relations: ['celestialObject', 'primaryBody']
    });
    if (!orbit) {
      throw new NotFoundException(`Orbit with ID ${id} not found`);
    }
    return orbit;
  }

  async update(id: number, updateOrbitDto: any): Promise<Orbit> {
    const orbit = await this.findOne(id);
    Object.assign(orbit, updateOrbitDto);
    return this.orbitRepository.save(orbit);
  }

  async remove(id: number): Promise<void> {
    const result = await this.orbitRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Orbit with ID ${id} not found`);
    }
  }
}
