import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CityEntity } from './cities.entity';
import { SocialAccountProviderEntity } from './socialAccountProviders.entity';
import { UserFollowEntity } from './userFollows.entity';
import { UserBlockEntity } from './userBlocks.entity';
import { FeedEntity } from './feeds.entity';
import { FeedCommentEntity } from './feedComments.entity';
import { FeedLikeEntity } from './feedLikes.entity';
import { BookmarkEntity } from './bookmarks.entity';

// @Unique(['nickname'])  // 닉네임 중복 (임시)허용(240207)
@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  nickname: string; // 첫 로그인시 작성  →  소셜로그인 정보로 삽입(240207)

  @Column({
    type: 'varchar',
    length: 100,
    // nullable: true, // check
  })
  email: string; // 소셜로그인으로 정보 삽입

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
  gender: number; // 성별, 0: 공용, 1: 남성, 2: 여성 / 비회원: 0만, 회원: 0~2 모두 다

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
  locationInformationAgree: number; // 위치정보 동의 여부, 0:동의안함, 1:사용중에만 동의, 2: 항상 동의

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  socialAccountUid: string; // 소셜로그인시, SNS ID

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: true,
    default:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
  })
  profileImage: string; // 소셜로그인으로 정보 삽입

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
  temperatureSensitivity: number; // 기온 민감도, 0: 기본, 1: 추위타요, 2: 더위타요

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
  deletedAt: Date; // 데이터는 삭제하지 않고, 탈퇴 한 날짜만 입력

  @ManyToOne(() => CityEntity, { eager: true })
  @JoinColumn({
    name: 'cityId',
    referencedColumnName: 'id',
  })
  city: CityEntity | number;

  @ManyToOne(() => SocialAccountProviderEntity)
  @JoinColumn({
    name: 'socialAccountProviderId',
    referencedColumnName: 'id',
  })
  socialAccountProvider: SocialAccountProviderEntity | number;

  @OneToMany(() => UserFollowEntity, (userFollow) => userFollow.user)
  userFollow: UserFollowEntity[];

  @OneToMany(() => UserFollowEntity, (userFollower) => userFollower.followUser)
  userFollower: UserFollowEntity[];

  @OneToMany(() => UserBlockEntity, (userBlock) => userBlock.user)
  userBlock: UserBlockEntity[];

  @OneToMany(() => UserBlockEntity, (userBlocker) => userBlocker.blockUser)
  userBlocker: UserBlockEntity[];

  @OneToMany(() => FeedEntity, (feed) => feed.user)
  feed: FeedEntity[];

  @OneToMany(() => FeedCommentEntity, (feedComment) => feedComment.user)
  fefeedCommented: FeedCommentEntity[];

  @OneToMany(() => FeedLikeEntity, (feedLike) => feedLike.user)
  feedLike: FeedLikeEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.user)
  bookmark: BookmarkEntity[];
}
