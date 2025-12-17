import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StellarSystemsService } from './stellar-systems.service';
import { StellarSystemsController } from './stellar-systems.controller';
import { StarSystem } from './entities/star-system.entity';

import { StellarNeighborhood } from './entities/stellar-neighborhood.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StarSystem, StellarNeighborhood])],
  controllers: [StellarSystemsController],
  providers: [StellarSystemsService],
})
export class StellarSystemsModule { }
