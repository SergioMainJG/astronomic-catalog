import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StarsService } from './stars.service';
import { CreateStarDto } from './dto/create-star.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Stars')
@Controller('stars')
export class StarsController {
  constructor(private readonly starsService: StarsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new star' })
  @ApiResponse({ status: 201, description: 'The star has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Star name already exists.' })
  create(@Body() createStarDto: CreateStarDto) {
    return this.starsService.create(createStarDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stars' })
  @ApiResponse({ status: 200, description: 'Return all stars.' })
  findAll() {
    return this.starsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a star by ID' })
  @ApiResponse({ status: 200, description: 'Return the star.' })
  @ApiResponse({ status: 404, description: 'Star not found.' })
  findOne(@Param('id') id: string) {
    return this.starsService.findOne(+id);
  }
}
