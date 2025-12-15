import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StarClustersService } from './star-clusters.service';

@Controller('star-clusters')
export class StarClustersController {
  constructor(private readonly starClustersService: StarClustersService) { }

  @Post()
  create(@Body() createStarClusterDto: any) {
    return this.starClustersService.create(createStarClusterDto);
  }

  @Get()
  findAll() {
    return this.starClustersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.starClustersService.findOne(+id);
  }
}
