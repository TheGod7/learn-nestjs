import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Notes & Document;

@Schema()
export class Notes {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  user: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Notes);
