import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JerarchyPlanetService } from './jerarchy-planet.service';

class CreateOrbitDto {
  celestialObjectId: number;
  primaryBodyId: number;
  semiMajorAxis: number;
  eccentricity: number;
  orbitalPeriod: number;
}

class UpdateOrbitDto {
  celestialObjectId?: number;
  primaryBodyId?: number;
  semiMajorAxis?: number;
  eccentricity?: number;
  orbitalPeriod?: number;
}

@Controller('jerarchy-planet')
export class JerarchyPlanetController {
  constructor(private readonly jerarchyPlanetService: JerarchyPlanetService) { }

  @Post()
  create(@Body() createOrbitDto: CreateOrbitDto) {
    return this.jerarchyPlanetService.create(createOrbitDto);
  }

  @Get()
  findAll() {
    return this.jerarchyPlanetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jerarchyPlanetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrbitDto: UpdateOrbitDto) {
    return this.jerarchyPlanetService.update(+id, updateOrbitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jerarchyPlanetService.remove(+id);
  }
}
