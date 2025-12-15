import { PartialType } from '@nestjs/swagger';
import { CreateStarSystemDto } from './create-star-system.dto';

export class UpdateStarSystemDto extends PartialType(CreateStarSystemDto) { }
