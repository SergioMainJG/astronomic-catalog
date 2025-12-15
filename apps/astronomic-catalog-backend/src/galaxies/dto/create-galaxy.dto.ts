import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Matches } from 'class-validator';

export class CreateGalaxyDto {
  @ApiProperty({ description: 'Global name of the galaxy', example: 'Andromeda' })
  @IsString()
  @IsNotEmpty()
  globalName: string;

  @ApiProperty({ description: 'Description of the galaxy', example: 'Nearest major galaxy' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Image URL', required: false, example: 'https://res.cloudinary.com/astronomic-catalog-images-assets/image/upload/v12345/galaxy.jpg' })
  @IsString()
  @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/, {
    message: 'Image URL must be from the official Cloudinary asset store',
  })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Galaxy type ID', example: 1 })
  @IsNumber()
  galaxyTypeId: number;

  @ApiProperty({ description: 'Distance in Million light years', example: 2.537 })
  @IsNumber()
  @Min(0)
  distanceMly: number;
}
