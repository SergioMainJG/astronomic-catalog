import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StarClustersService } from './star-clusters.service';
import { CreateStarClusterDto } from './dto/create-star-cluster.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Star Clusters')
@Controller('star-clusters')
export class StarClustersController {
  constructor(private readonly starClustersService: StarClustersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new star cluster' })
  @ApiResponse({ status: 201, description: 'The star cluster has been successfully created.' })
  @ApiResponse({ status: 409, description: 'Star cluster name already exists.' })
  create(@Body() createStarClusterDto: CreateStarClusterDto) {
    return this.starClustersService.create(createStarClusterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all star clusters' })
  @ApiResponse({ status: 200, description: 'Return all star clusters.' })
  findAll() {
    return this.starClustersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a star cluster by ID' })
  @ApiResponse({ status: 200, description: 'Return the star cluster.' })
  @ApiResponse({ status: 404, description: 'Star cluster not found.' })
  findOne(@Param('id') id: string) {
    return this.starClustersService.findOne(+id);
  }
}
