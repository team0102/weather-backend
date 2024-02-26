import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'chats',
})
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
