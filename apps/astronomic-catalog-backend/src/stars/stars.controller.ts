import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StarsService } from './stars.service';

@Controller('stars')
export class StarsController {
  constructor(private readonly starsService: StarsService) { }

  @Post()
  create(@Body() createStarDto: any) {
    return this.starsService.create(createStarDto);
  }

  @Get()
  findAll() {
    return this.starsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starsService.findOne(+id);
  }
}
