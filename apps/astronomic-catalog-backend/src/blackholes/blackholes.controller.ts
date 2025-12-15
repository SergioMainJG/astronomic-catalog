import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlackholesService } from './blackholes.service';

// Basic DTOs defined inline for speed, can extract later
class CreateBlackHoleDto {
  globalName: string;
  description: string;
  imageUrl?: string;
  massSolar: number;
}

class UpdateBlackHoleDto {
  globalName?: string;
  description?: string;
  imageUrl?: string;
  massSolar?: number;
}

@Controller('blackholes')
export class BlackholesController {
  constructor(private readonly blackholesService: BlackholesService) { }

  @Post()
  create(@Body() createBlackHoleDto: CreateBlackHoleDto) {
    return this.blackholesService.create(createBlackHoleDto);
  }

  @Get()
  findAll() {
    return this.blackholesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blackholesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlackHoleDto: UpdateBlackHoleDto) {
    return this.blackholesService.update(+id, updateBlackHoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blackholesService.remove(+id);
  }
}
