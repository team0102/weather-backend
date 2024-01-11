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

  // 날씨 연결 관계
  //   @ManyToOne(() => weatherConditionEntity)
  //   @JoinColumn({
  //     name: 'weatherCondition',
  //     referencedColumnName: 'id',
  //   })
  //   weatherCondition: weatherConditionEntity

  @OneToMany(() => FeedImageEntity, (feedImage) => feedImage.feed)
  feedImage: FeedImageEntity[];

  @OneToMany(() => FeedCommentEntity, (feedComment) => feedComment.feed)
  feedComment: FeedCommentEntity[];

  @OneToMany(() => FeedLikeEntity, (feedLike) => feedLike.feed)
  feedLike: FeedLikeEntity[];

  @OneToMany(() => FeedTagEntity, (feedTag) => feedTag.feed)
  feedTag: FeedTagEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.feed)
  bookmark: BookmarkEntity[];

}
