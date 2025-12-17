import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Matches } from 'class-validator';

export class CreateStarDto {
  @ApiProperty({ description: 'Global name of the star', example: 'Sun' })
  @IsString()
  @IsNotEmpty()
  globalName: string;

  @ApiProperty({ description: 'Description of the star', example: 'Our home star' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Image URL', required: false, example: 'https://res.cloudinary.com/astronomic-catalog-images-assets/image/upload/v12345/star.jpg' })
  @IsString()
  @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/, {
    message: 'Image URL must be from the official Cloudinary asset store',
  })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Constellation ID', example: 1 })
  @IsNumber()
  constellationId: number;

  @ApiProperty({ description: 'System ID', example: 1 })
  @IsNumber()
  systemId: number;

  @ApiProperty({ description: 'Spectral type ID', example: 1 })
  @IsNumber()
  spectralTypeId: number;

  @ApiProperty({ description: 'Mass in Solar masses', example: 1.0 })
  @IsNumber()
  @Min(0)
  massSolar: number;

  @ApiProperty({ description: 'Radius in Solar radii', example: 1.0 })
  @IsNumber()
  @Min(0)
  radiusSolar: number;
}
