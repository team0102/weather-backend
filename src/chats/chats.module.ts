import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsService } from './chats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chats, ChatsSchema } from './schema/chats.schema';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chats.name, schema: ChatsSchema }])],
  providers: [ChatsService, ChatsGateway],
  exports: [MongooseModule]
})
export class ChatsModule {}
