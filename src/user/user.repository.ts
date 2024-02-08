import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities/users.entity';
import { LoginDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userTypeormRepository: Repository<UserEntity>,
  ) {}

  // 테스트용 로그인 api
  async findUserByUid(socialAccountUid: string): Promise<UserEntity | null> {
    return await this.userTypeormRepository.findOneBy({
      socialAccountUid: socialAccountUid,
    });
  }

  // ------------------------------------------------------------------------------------------------

  async getCheckNicknameOverlap(nickname: string): Promise<Number> {
    return await this.userTypeormRepository.countBy({
      nickname: nickname,
    });
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return await this.userTypeormRepository.findOneBy({ id: id });
  }

  async deleteUserById(id: number): Promise<void> {
    await this.userTypeormRepository.softDelete({ id: id });
  }
  // ------------------------------------------------------------------------------------------------

  // method. A------------------------------------------------------------------------------------------------

  async create({
    socialAccountUid,
    SocialAccountProvider,
    email,
    nickname,
    profileImage,
  }): Promise<UserEntity> {
    const kakaoUser = await this.userTypeormRepository.create({
      socialAccountUid,
      SocialAccountProvider,
      email,
      nickname,
      profileImage,
    });

    return await this.userTypeormRepository.save(kakaoUser);
  }

  // method. B------------------------------------------------------------------------------------------------

  async findUserByKakaoId(kakaoId: string): Promise<UserEntity> {
    // kakaoId: string ???
    return await this.userTypeormRepository.findOne({
      where: {
        socialAccountUid: kakaoId,
      },
    });
  }

  async createKakaoUser(data: {
    kakaoId: string;
    username: string;
    displayName: string;
    email: string | null;
  }): Promise<UserEntity> {
    const newUser = this.userTypeormRepository.create(data);
    return this.userTypeormRepository.save(newUser);
  }
}
