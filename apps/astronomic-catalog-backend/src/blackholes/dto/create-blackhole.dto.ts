import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Matches } from 'class-validator';

export class CreateBlackHoleDto {
  @ApiProperty({ description: 'Global name of the black hole', example: 'Sgr A*' })
  @IsString()
  @IsNotEmpty()
  globalName: string;

  @ApiProperty({ description: 'Description of the black hole', example: 'Supermassive black hole at galactic center' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Image URL', required: false, example: 'https://res.cloudinary.com/astronomic-catalog-images-assets/image/upload/v12345/blackhole.jpg' })
  @IsString()
  @Matches(/^https:\/\/res\.cloudinary\.com\/astronomic-catalog-images-assets\/.*$/, {
    message: 'Image URL must be from the official Cloudinary asset store',
  })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Mass in Solar masses', example: 4000000 })
  @IsNumber()
  @Min(0)
  massSolar: number;
}
