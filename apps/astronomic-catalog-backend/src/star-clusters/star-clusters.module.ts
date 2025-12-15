import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarClustersService } from './star-clusters.service';
import { StarClustersController } from './star-clusters.controller';
import { StarCluster } from './entities/star-cluster.entity';
import { CelestialObject } from '../shared/entities/celestial-object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StarCluster, CelestialObject])],
  controllers: [StarClustersController],
  providers: [StarClustersService],
})
export class StarClustersModule { }
