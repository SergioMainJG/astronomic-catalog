import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlackholesService } from './blackholes.service';
import { CreateBlackHoleDto } from './dto/create-blackhole.dto';
import { UpdateBlackHoleDto } from './dto/update-blackhole.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Blackholes')
@Controller('blackholes')
export class BlackholesController {
  constructor(private readonly blackholesService: BlackholesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new black hole' })
  @ApiResponse({ status: 201, description: 'The black hole has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Black hole name already exists.' })
  create(@Body() createBlackHoleDto: CreateBlackHoleDto) {
    return this.blackholesService.create(createBlackHoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all black holes' })
  @ApiResponse({ status: 200, description: 'Return all black holes.' })
  findAll() {
    return this.blackholesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a black hole by ID' })
  @ApiResponse({ status: 200, description: 'Return the black hole.' })
  @ApiResponse({ status: 404, description: 'Black hole not found.' })
  findOne(@Param('id') id: string) {
    return this.blackholesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a black hole by ID' })
  @ApiResponse({ status: 200, description: 'The black hole has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Black hole not found.' })
  update(@Param('id') id: string, @Body() updateBlackHoleDto: UpdateBlackHoleDto) {
    return this.blackholesService.update(+id, updateBlackHoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a black hole by ID' })
  @ApiResponse({ status: 200, description: 'The black hole has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Black hole not found.' })
  remove(@Param('id') id: string) {
    return this.blackholesService.remove(+id);
  }
}
