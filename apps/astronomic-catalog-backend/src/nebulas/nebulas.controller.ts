import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NebulasService } from './nebulas.service';

@Controller('nebulas')
export class NebulasController {
  constructor(private readonly nebulasService: NebulasService) { }

  @Post()
  create(@Body() createNebulaDto: any) {
    return this.nebulasService.create(createNebulaDto);
  }

  @Get()
  findAll() {
    return this.nebulasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nebulasService.findOne(+id);
  }
}
