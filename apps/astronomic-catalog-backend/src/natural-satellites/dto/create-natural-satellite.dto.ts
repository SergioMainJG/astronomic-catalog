import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Matches } from 'class-validator';

export class CreateNaturalSatelliteDto {
  @ApiProperty({ description: 'Global name of the satellite', example: 'Moon' })
  @IsString()
  @IsNotEmpty()
  globalName: string;

  @ApiProperty({ description: 'Description of the satellite', example: 'Earth natural satellite' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Image URL', required: false, example: 'https://res.cloudinary.com/astronomic-catalog-images-assets/image/upload/v12345/moon.jpg' })
  @IsString()
  @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/, {
    message: 'Image URL must be from the official Cloudinary asset store',
  })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Mass in satellite masses', example: 0.0123 })
  @IsNumber()
  @Min(0)
  massSatellite: number;

  @ApiProperty({ description: 'Radius in satellite radii', example: 0.2727 })
  @IsNumber()
  @Min(0)
  radiusSatellite: number;
}
