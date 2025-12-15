import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NebulasService } from './nebulas.service';
import { NebulasController } from './nebulas.controller';
import { Nebula } from './entities/nebula.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nebula, CelestialObject])],
  controllers: [NebulasController],
  providers: [NebulasService],
})
export class NebulasModule { }
