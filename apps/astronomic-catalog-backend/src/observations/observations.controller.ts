import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ObservationsService } from './observations.service';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Observations')
@Controller('observations')
export class ObservationsController {
  constructor(private readonly observationsService: ObservationsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new observation' })
  @ApiResponse({ status: 201, description: 'The observation has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Observation for this object at this time already exists.' })
  create(@Body() createObservationDto: CreateObservationDto) {
    return this.observationsService.create(createObservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all observations' })
  @ApiResponse({ status: 200, description: 'Return all observations.' })
  findAll() {
    return this.observationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an observation by ID' })
  @ApiResponse({ status: 200, description: 'Return the observation.' })
  @ApiResponse({ status: 404, description: 'Observation not found.' })
  findOne(@Param('id') id: string) {
    return this.observationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an observation by ID' })
  @ApiResponse({ status: 200, description: 'The observation has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Observation not found.' })
  update(@Param('id') id: string, @Body() updateObservationDto: UpdateObservationDto) {
    return this.observationsService.update(id, updateObservationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an observation by ID' })
  @ApiResponse({ status: 200, description: 'The observation has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Observation not found.' })
  remove(@Param('id') id: string) {
    return this.observationsService.remove(id);
  }
}
