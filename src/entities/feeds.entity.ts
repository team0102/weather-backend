import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { FeedImageEntity } from './feedImages.entity';
import { FeedCommentEntity } from './feedComments.entity';
import { FeedTagEntity } from './feedTags.entity';
import { FeedLikeEntity } from './feedLikes.entity';
import { BookmarkEntity } from './bookmarks.entity';
import { WeatherConditionEntity } from './weatherCondition.entity';

@Entity({
  name: 'feeds',
})
export class FeedEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 2000,
  })
  content: string;

  @Column({
    type: 'int',
  })
  lowTemperature: number; // 최저기온, 프론트에서 받아서 저장

  @Column({
    type: 'int',
  })
  highTemperature: number; // 최고기온, 프론트에서 받아서 저장

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

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => WeatherConditionEntity)
  @JoinColumn({
    name: 'weatherConditionId',
    referencedColumnName: 'id',
  })
  weatherCondition: WeatherConditionEntity;

  @OneToMany(() => FeedImageEntity, (feedImage) => feedImage.feed, { cascade: ['insert', 'update']})
  feedImage: FeedImageEntity[];

  @OneToMany(() => FeedCommentEntity, (feedComment) => feedComment.feed)
  feedComment: FeedCommentEntity[];

  @OneToMany(() => FeedLikeEntity, (feedLike) => feedLike.feed)
  feedLike: FeedLikeEntity[];

  @OneToMany(() => FeedTagEntity, (feedTag) => feedTag.feed, { cascade: ['insert', 'update', 'remove']})
  feedTag: FeedTagEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.feed)
  bookmark: BookmarkEntity[];
}
