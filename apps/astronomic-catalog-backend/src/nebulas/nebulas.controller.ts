import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NebulasService } from './nebulas.service';
import { CreateNebulaDto } from './dto/create-nebula.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Nebulas')
@Controller('nebulas')
export class NebulasController {
  constructor(private readonly nebulasService: NebulasService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new nebula' })
  @ApiResponse({ status: 201, description: 'The nebula has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Nebula name already exists.' })
  create(@Body() createNebulaDto: CreateNebulaDto) {
    return this.nebulasService.create(createNebulaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all nebulas' })
  @ApiResponse({ status: 200, description: 'Return all nebulas.' })
  findAll() {
    return this.nebulasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a nebula by ID' })
  @ApiResponse({ status: 200, description: 'Return the nebula.' })
  @ApiResponse({ status: 404, description: 'Nebula not found.' })
  findOne(@Param('id') id: string) {
    return this.nebulasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a nebula by ID' })
  @ApiResponse({ status: 200, description: 'The nebula has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Nebula not found.' })
  update(@Param('id') id: string, @Body() updateNebulaDto: any) {
    return this.nebulasService.update(id, updateNebulaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a nebula by ID' })
  @ApiResponse({ status: 200, description: 'The nebula has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Nebula not found.' })
  remove(@Param('id') id: string) {
    return this.nebulasService.remove(id);
  }
}
