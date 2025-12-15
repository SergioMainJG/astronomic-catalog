import { PartialType } from '@nestjs/swagger';
import { CreateBlackHoleDto } from './create-blackhole.dto';

export class UpdateBlackHoleDto extends PartialType(CreateBlackHoleDto) { }
