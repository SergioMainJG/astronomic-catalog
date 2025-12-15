import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ObservationsService } from './observations.service';
import { ObservationsController } from './observations.controller';
import { Observation, ObservationSchema } from './schemas/observation.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Observation.name, schema: ObservationSchema }])],
  controllers: [ObservationsController],
  providers: [ObservationsService],
})
export class ObservationsModule { }
