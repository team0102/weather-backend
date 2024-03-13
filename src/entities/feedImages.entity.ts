import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FeedEntity } from './feeds.entity';
import { Transform } from 'class-transformer';
import { FEED_PUBLIC_IMAGE_PATH } from './../common/const/path.const';
import { join } from 'path';

@Entity({
  name: 'feed_images',
})
export class FeedImageEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 2000,
  })
  imageUrl: string;

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

  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date; // 데이터는 삭제하지 않고, 삭제한 날짜만 입력

  @ManyToOne(() => FeedEntity, { cascade: true })
  @JoinColumn({
    name: 'feedId',
    referencedColumnName: 'id',
  })
  feed: FeedEntity;
}
