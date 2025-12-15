import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Matches } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty({ description: 'Global name of the planet', example: 'Earth' })
  @IsString()
  @IsNotEmpty()
  globalName: string;

  @ApiProperty({ description: 'Description of the planet', example: 'The Blue Planet' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Image URL', required: false, example: 'https://res.cloudinary.com/astronomic-catalog-images-assets/image/upload/v12345/planet.jpg' })
  @IsString()
  @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/, {
    message: 'Image URL must be from the official Cloudinary asset store',
  })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Planet type ID', example: 1 })
  @IsNumber()
  planetTypeId: number;

  @ApiProperty({ description: 'Mass in Earth masses', example: 1.0 })
  @IsNumber()
  @Min(0)
  massEarth: number;

  @ApiProperty({ description: 'Radius in Earth radii', example: 1.0 })
  @IsNumber()
  @Min(0)
  radiusEarth: number;
}
