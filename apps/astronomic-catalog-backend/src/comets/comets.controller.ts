import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CometsService } from './comets.service';
import { CreateCometDto } from './dto/create-comet.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comets')
@Controller('comets')
export class CometsController {
  constructor(private readonly cometsService: CometsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new comet' })
  @ApiResponse({ status: 201, description: 'The comet has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Comet name already exists.' })
  create(@Body() createCometDto: CreateCometDto) {
    return this.cometsService.create(createCometDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comets' })
  @ApiResponse({ status: 200, description: 'Return all comets.' })
  findAll() {
    return this.cometsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comet by ID' })
  @ApiResponse({ status: 200, description: 'Return the comet.' })
  @ApiResponse({ status: 404, description: 'Comet not found.' })
  findOne(@Param('id') id: string) {
    return this.cometsService.findOne(+id);
  }
}
