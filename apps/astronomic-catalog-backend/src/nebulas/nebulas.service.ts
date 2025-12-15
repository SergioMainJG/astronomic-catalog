import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Nebula } from './schemas/nebula.schema';
import { CreateNebulaDto } from './dto/create-nebula.dto';

@Injectable()
export class NebulasService {
  constructor(
    @InjectModel(Nebula.name) private nebulaModel: Model<Nebula>,
  ) { }

  async create(createNebulaDto: CreateNebulaDto): Promise<Nebula> {
    const existing = await this.nebulaModel.findOne({ globalName: createNebulaDto.globalName });
    if (existing) {
      throw new ConflictException('Nebula with this name already exists');
    }

    const createdNebula = new this.nebulaModel(createNebulaDto);
    return createdNebula.save();
  }

  async findAll(): Promise<Nebula[]> {
    return this.nebulaModel.find().exec();
  }

  async findOne(id: number | string): Promise<Nebula> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const nebula = await this.nebulaModel.findById(id).exec();
    if (!nebula) {
      throw new NotFoundException(`Nebula with ID ${id} not found`);
    }
    return nebula;
  }

  async update(id: string, updateNebulaDto: any): Promise<Nebula> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const updatedNebula = await this.nebulaModel.findByIdAndUpdate(id, updateNebulaDto, { new: true }).exec();
    if (!updatedNebula) {
      throw new NotFoundException(`Nebula with ID ${id} not found`);
    }
    return updatedNebula;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const result = await this.nebulaModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Nebula with ID ${id} not found`);
    }
  }
}
