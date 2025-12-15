import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CometsService } from './comets.service';

@Controller('comets')
export class CometsController {
  constructor(private readonly cometsService: CometsService) { }

  @Post()
  create(@Body() createCometDto: any) {
    return this.cometsService.create(createCometDto);
  }

  @Get()
  findAll() {
    return this.cometsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cometsService.findOne(+id);
  }
}
