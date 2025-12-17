import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NaturalSatellitesService } from './natural-satellites.service';
import { CreateNaturalSatelliteDto } from './dto/create-natural-satellite.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Natural Satellites')
@Controller('natural-satellites')
export class NaturalSatellitesController {
  constructor(private readonly naturalSatellitesService: NaturalSatellitesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new natural satellite' })
  @ApiResponse({ status: 201, description: 'The natural satellite has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Natural satellite name already exists.' })
  create(@Body() createNaturalSatelliteDto: CreateNaturalSatelliteDto) {
    return this.naturalSatellitesService.create(createNaturalSatelliteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all natural satellites' })
  @ApiResponse({ status: 200, description: 'Return all natural satellites.' })
  findAll() {
    return this.naturalSatellitesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a natural satellite by ID' })
  @ApiResponse({ status: 200, description: 'Return the natural satellite.' })
  @ApiResponse({ status: 404, description: 'Natural satellite not found.' })
  findOne(@Param('id') id: string) {
    return this.naturalSatellitesService.findOne(+id);
  }
}
