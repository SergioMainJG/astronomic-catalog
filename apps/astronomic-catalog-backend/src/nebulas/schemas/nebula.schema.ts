import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NebulaDocument = HydratedDocument<Nebula>;

@Schema()
export class Nebula {
  @Prop({ required: true, unique: true })
  globalName: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: true })
  neighborhoodId: number;
}

export const NebulaSchema = SchemaFactory.createForClass(Nebula);
