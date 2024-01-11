import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Unique(['email'])
@Entity()
export class User {
  @PrimaryGeneratedColumn({name: 'id', type: 'int'})
  id: number;

  @Column({name: 'nickname', type: 'varchar', length})
  nickname: string;  // 첫 로그인시 작성

  @Column({name: 'email', type: 'varchar', length})
  email: string;  // 소셜로그인으로 정보 삽입

  @Column({name: 'gender', type: 'tinyint', default: 0})
  gender: number;  // 성별, 0: 공용, 1: 남성, 2: 여성 / 비회원: 0만, 회원: 0~2 모두 다

  @Column({name: 'location_information_agree', type: 'int', length, default: 0})
  locationInformationAgree: number; // 위치정보 동의 여부, 0:동의안함, 1:사용중에만 동의, 2: 항상 동의

  @Column({name: 'city_id', type: 'int'})
  cityId: number;  // 대도시단위(서울, 부산 등), *** cities 연결

  @Column({name: 'social_account_provider_id', type: 'int'})
  socialAccountProviderId: number;  // 소셜로그인시, *** social_account_provider 연결

  // @Column({name: 'social_account_id'})
  // socialAcountUid varchar(500)  // 소셜로그인시, SNS ID
  // profileImage varchar(2000)  // 소셜로그인으로 정보 삽입

  @Column({name: 'temperature_sensitity', type: 'tinyint', default: 0})
  temperatureSensitivity: number; // 기온 민감도, 0: 기본, 1: 추위타요, 2: 더위타요

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' , nullable: true })
  updatedAt: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', default: null })
  deletedAt: Date; // 데이터는 삭제하지 않고, 탈퇴 한 날짜만 입력

}