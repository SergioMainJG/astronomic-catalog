import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NebulasService } from './nebulas.service';
import { NebulasController } from './nebulas.controller';
import { Nebula, NebulaSchema } from './schemas/nebula.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Nebula.name, schema: NebulaSchema }])],
  controllers: [NebulasController],
  providers: [NebulasService],
})
export class NebulasModule { }
