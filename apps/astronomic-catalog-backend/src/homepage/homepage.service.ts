import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CelestialObjectWithType } from './entities/celestial-object-with-type.view-entity';

@Injectable()
export class HomepageService {
  constructor(
    @InjectRepository(CelestialObjectWithType)
    private readonly repository: Repository<CelestialObjectWithType>,
  ) { }

  findAll(): Promise<CelestialObjectWithType[]> {
    return this.repository.find();
  }
}
