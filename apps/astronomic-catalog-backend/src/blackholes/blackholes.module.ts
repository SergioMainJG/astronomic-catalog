import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlackholesService } from './blackholes.service';
import { BlackholesController } from './blackholes.controller';
import { BlackHole } from './entities/blackhole.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlackHole, CelestialObject])],
  controllers: [BlackholesController],
  providers: [BlackholesService],
})
export class BlackholesModule { }
