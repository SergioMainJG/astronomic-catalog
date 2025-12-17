import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStarSystemDto {
  @ApiProperty({ description: 'Name of the star system', example: 'Alpha Centauri' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Neighborhood ID', example: 1 })
  @IsNumber()
  neighborhoodId: number;
}
