import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AsteroidsService } from './asteroids.service';
import { CreateAsteroidDto } from './dto/create-asteroid.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Asteroids')
@Controller('asteroids')
export class AsteroidsController {
  constructor(private readonly asteroidsService: AsteroidsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new asteroid' })
  @ApiResponse({ status: 201, description: 'The asteroid has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Asteroid name already exists.' })
  create(@Body() createAsteroidDto: CreateAsteroidDto) {
    return this.asteroidsService.create(createAsteroidDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all asteroids' })
  @ApiResponse({ status: 200, description: 'Return all asteroids.' })
  findAll() {
    return this.asteroidsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an asteroid by ID' })
  @ApiResponse({ status: 200, description: 'Return the asteroid.' })
  @ApiResponse({ status: 404, description: 'Asteroid not found.' })
  findOne(@Param('id') id: string) {
    return this.asteroidsService.findOne(+id);
  }
}
