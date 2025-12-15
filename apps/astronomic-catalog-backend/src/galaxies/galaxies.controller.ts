import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalaxiesService } from './galaxies.service';
import { CreateGalaxyDto } from './dto/create-galaxy.dto';
import { UpdateGalaxyDto } from './dto/update-galaxy.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Galaxies')
@Controller('galaxies')
export class GalaxiesController {
  constructor(private readonly galaxiesService: GalaxiesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new galaxy' })
  @ApiResponse({ status: 201, description: 'The galaxy has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Galaxy name already exists.' })
  create(@Body() createGalaxyDto: CreateGalaxyDto) {
    return this.galaxiesService.create(createGalaxyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all galaxies' })
  @ApiResponse({ status: 200, description: 'Return all galaxies.' })
  findAll() {
    return this.galaxiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a galaxy by ID' })
  @ApiResponse({ status: 200, description: 'Return the galaxy.' })
  @ApiResponse({ status: 404, description: 'Galaxy not found.' })
  findOne(@Param('id') id: string) {
    return this.galaxiesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a galaxy by ID' })
  @ApiResponse({ status: 200, description: 'The galaxy has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Galaxy not found.' })
  update(@Param('id') id: string, @Body() updateGalaxyDto: UpdateGalaxyDto) {
    return this.galaxiesService.update(+id, updateGalaxyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a galaxy by ID' })
  @ApiResponse({ status: 200, description: 'The galaxy has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Galaxy not found.' })
  remove(@Param('id') id: string) {
    return this.galaxiesService.remove(+id);
  }
}
