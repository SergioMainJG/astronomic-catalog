import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NaturalSatellitesService } from './natural-satellites.service';

@Controller('natural-satellites')
export class NaturalSatellitesController {
  constructor(private readonly naturalSatellitesService: NaturalSatellitesService) { }

  @Post()
  create(@Body() createNaturalSatelliteDto: any) {
    return this.naturalSatellitesService.create(createNaturalSatelliteDto);
  }

  @Get()
  findAll() {
    return this.naturalSatellitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.naturalSatellitesService.findOne(+id);
  }
}
