import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StellarSystemsService } from './stellar-systems.service';
import { CreateStarSystemDto } from './dto/create-star-system.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Stellar Systems')
@Controller('stellar-systems')
export class StellarSystemsController {
  constructor(private readonly stellarSystemsService: StellarSystemsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new stellar system' })
  @ApiResponse({ status: 201, description: 'The stellar system has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Stellar system name already exists.' })
  create(@Body() createStarSystemDto: CreateStarSystemDto) {
    return this.stellarSystemsService.create(createStarSystemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stellar systems' })
  @ApiResponse({ status: 200, description: 'Return all stellar systems.' })
  findAll() {
    return this.stellarSystemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stellar system by ID' })
  @ApiResponse({ status: 200, description: 'Return the stellar system.' })
  @ApiResponse({ status: 404, description: 'Stellar system not found.' })
  findOne(@Param('id') id: string) {
    return this.stellarSystemsService.findOne(+id);
  }
  remove(@Param('id') id: string) {
    return this.stellarSystemsService.remove(+id);
  }
}
