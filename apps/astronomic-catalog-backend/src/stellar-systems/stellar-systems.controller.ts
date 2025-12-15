import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StellarSystemsService } from './stellar-systems.service';

class CreateStarSystemDto {
  name: string;
  neighborhoodId: number;
}

class UpdateStarSystemDto {
  name?: string;
  neighborhoodId?: number;
}

@Controller('stellar-systems')
export class StellarSystemsController {
  constructor(private readonly stellarSystemsService: StellarSystemsService) { }

  @Post()
  create(@Body() createStarSystemDto: CreateStarSystemDto) {
    return this.stellarSystemsService.create(createStarSystemDto);
  }

  @Get()
  findAll() {
    return this.stellarSystemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stellarSystemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStarSystemDto: UpdateStarSystemDto) {
    return this.stellarSystemsService.update(+id, updateStarSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stellarSystemsService.remove(+id);
  }
}
