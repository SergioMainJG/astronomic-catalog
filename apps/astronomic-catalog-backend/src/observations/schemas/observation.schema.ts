import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ObservationDocument = HydratedDocument<Observation>;

@Schema()
export class Observation {
  @Prop({ required: true })
  celestialObjectId: string;

  @Prop({ required: true })
  observedAt: Date;

  @Prop({ required: true })
  notes: string;

  @Prop()
  observerName: string;
}

export const ObservationSchema = SchemaFactory.createForClass(Observation);

ObservationSchema.index({ celestialObjectId: 1, observedAt: 1 }, { unique: true });
