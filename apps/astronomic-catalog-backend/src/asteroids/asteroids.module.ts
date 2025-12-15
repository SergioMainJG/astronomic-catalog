import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsteroidsService } from './asteroids.service';
import { AsteroidsController } from './asteroids.controller';
import { Asteroid } from './entities/asteroid.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asteroid, CelestialObject])],
  controllers: [AsteroidsController],
  providers: [AsteroidsService],
})
export class AsteroidsModule { }
