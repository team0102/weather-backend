import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chats, ChatsDocument } from './schema/chats.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chats.name) private chatsModel: Model<ChatsDocument>,
  ) {}

  async createChat(name, cityId: number, content: string): Promise<Chats> {
    const createChat = new this.chatsModel({
      userNickname: name.userNickname,
      cityId,
      content,
    });

    return createChat.save();
  }
}
