import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateObservationDto {
  @ApiProperty({ description: 'ID of the celestial object observed', example: '60d5ecb8b487343510e42f92' })
  @IsString()
  @IsNotEmpty()
  celestialObjectId: string;

  @ApiProperty({ description: 'Date and time of observation', example: '2025-12-15T14:30:00.000Z' })
  @IsDateString()
  @IsNotEmpty()
  observedAt: string;

  @ApiProperty({ description: 'Observation notes', example: 'Clear visibility, distinct reddish hue.' })
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty({ description: 'Name of the observer', required: false, example: 'John Doe' })
  @IsString()
  @IsOptional()
  observerName?: string;
}
