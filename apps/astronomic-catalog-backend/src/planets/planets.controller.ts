import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new planet' })
  @ApiResponse({ status: 201, description: 'The planet has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Planet name already exists.' })
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all planets' })
  @ApiResponse({ status: 200, description: 'Return all planets.' })
  findAll() {
    return this.planetsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a planet by ID' })
  @ApiResponse({ status: 200, description: 'Return the planet.' })
  @ApiResponse({ status: 404, description: 'Planet not found.' })
  findOne(@Param('id') id: string) {
    return this.planetsService.findOne(+id);
  }
}
