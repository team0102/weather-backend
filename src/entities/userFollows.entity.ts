import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';

@Entity({
  name: 'userFollows',
})
export class UserFollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'followUserId',
    referencedColumnName: 'id',
  })
  followUser: UserEntity;
}
