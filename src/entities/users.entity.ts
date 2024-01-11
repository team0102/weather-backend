import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CityEntity } from './cities.entity';

@Unique(['socialAccountUid'])
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  nickname: string; // 첫 로그인시 작성

  @Column({
    type: 'varchar',
    length: 100,
  })
  email: string; // 소셜로그인으로 정보 삽입

  @Column({
    type: 'tinyint',
    default: 0,
  })
  gender: number; // 성별, 0: 공용, 1: 남성, 2: 여성 / 비회원: 0만, 회원: 0~2 모두 다

  @Column({
    type: 'tinyint',
    default: 0,
    nullable: true,
  })
  locationInformationAgree: number; // 위치정보 동의 여부, 0:동의안함, 1:사용중에만 동의, 2: 항상 동의

  @Column({
    type: 'int',
    nullable: true,
  })
  socialAccountProviderId: number; // 소셜로그인시, *** social_account_provider 연결

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

  @ManyToOne(() => CityEntity)
  @JoinColumn({
    name: 'cityId',
    referencedColumnName: 'id',
  })
  city: CityEntity;
}
