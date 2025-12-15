import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalaxiesService } from './galaxies.service';

class CreateGalaxyDto {
  globalName: string;
  description: string;
  imageUrl?: string;
  galaxyTypeId: number;
  distanceMly: number;
}

class UpdateGalaxyDto {
  globalName?: string;
  description?: string;
  imageUrl?: string;
  galaxyTypeId?: number;
  distanceMly?: number;
}

@Controller('galaxies')
export class GalaxiesController {
  constructor(private readonly galaxiesService: GalaxiesService) { }

  @Post()
  create(@Body() createGalaxyDto: CreateGalaxyDto) {
    return this.galaxiesService.create(createGalaxyDto);
  }

  @Get()
  findAll() {
    return this.galaxiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galaxiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalaxyDto: UpdateGalaxyDto) {
    return this.galaxiesService.update(+id, updateGalaxyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galaxiesService.remove(+id);
  }
}
