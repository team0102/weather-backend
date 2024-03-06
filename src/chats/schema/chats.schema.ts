import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatsDocument = Chats & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Chats {
  @Prop()
  userNickname: string;

  @Prop()
  cityId: number;

  @Prop()
  content: string;
}

export const ChatsSchema = SchemaFactory.createForClass(Chats);
