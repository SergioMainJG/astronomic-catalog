import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Matches } from 'class-validator';

export class CreateAsteroidDto {
  @ApiProperty({ description: 'Global name of the asteroid', example: 'Ceres' })
  @IsString()
  @IsNotEmpty()
  globalName: string;

  @ApiProperty({ description: 'Description of the asteroid', example: 'Dwarf planet in asteroid belt' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Image URL', required: false, example: 'https://res.cloudinary.com/astronomic-catalog-images-assets/image/upload/v12345/asteroid.jpg' })
  @IsString()
  @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/, {
    message: 'Image URL must be from the official Cloudinary asset store',
  })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Type ID', example: 1 })
  @IsNumber()
  typeId: number;
}
