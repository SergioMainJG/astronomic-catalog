import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { CelestialObjectWithType } from './entities/celestial-object-with-type.view-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CelestialObjectWithType])],
  controllers: [HomepageController],
  providers: [HomepageService],
})
export class HomepageModule { }
