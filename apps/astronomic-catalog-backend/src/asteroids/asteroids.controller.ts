import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AsteroidsService } from './asteroids.service';

@Controller('asteroids')
export class AsteroidsController {
  constructor(private readonly asteroidsService: AsteroidsService) { }

  @Post()
  create(@Body() createAsteroidDto: any) {
    return this.asteroidsService.create(createAsteroidDto);
  }

  @Get()
  findAll() {
    return this.asteroidsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asteroidsService.findOne(+id);
  }
}
