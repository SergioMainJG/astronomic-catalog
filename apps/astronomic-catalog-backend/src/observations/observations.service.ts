import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Observation } from './schemas/observation.schema';
import { CreateObservationDto } from './dto/create-observation.dto';
import { UpdateObservationDto } from './dto/update-observation.dto';

@Injectable()
export class ObservationsService {
  constructor(
    @InjectModel(Observation.name) private observationModel: Model<Observation>,
  ) { }

  async create(createObservationDto: CreateObservationDto): Promise<Observation> {
    const existing = await this.observationModel.findOne({
      celestialObjectId: createObservationDto.celestialObjectId,
      observedAt: createObservationDto.observedAt,
    });

    if (existing) {
      throw new ConflictException('Observation for this object at this time already exists');
    }

    const createdObservation = new this.observationModel(createObservationDto);
    return createdObservation.save();
  }

  async findAll(): Promise<Observation[]> {
    return this.observationModel.find().exec();
  }

  async findOne(id: string): Promise<Observation> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const observation = await this.observationModel.findById(id).exec();
    if (!observation) {
      throw new NotFoundException(`Observation with ID ${id} not found`);
    }
    return observation;
  }

  async update(id: string, updateObservationDto: UpdateObservationDto): Promise<Observation> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const updatedObservation = await this.observationModel
      .findByIdAndUpdate(id, updateObservationDto, { new: true })
      .exec();

    if (!updatedObservation) {
      throw new NotFoundException(`Observation with ID ${id} not found`);
    }
    return updatedObservation;
  }

  async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format`);
    }

    const result = await this.observationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Observation with ID ${id} not found`);
    }
  }
}
