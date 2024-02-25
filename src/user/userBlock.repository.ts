import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserBlockEntity } from 'src/entities/userBlocks.entity';

@Injectable()
export class UserBlockRepository {
  constructor(
    @InjectRepository(UserBlockEntity)
    private readonly userBlockTypeormRepository: Repository<UserBlockEntity>,
  ) {}

  async findUserBlockList(userId: number): Promise<UserBlockEntity[] | null> {
    return await this.userBlockTypeormRepository.find({
      select: {
        id: true,
        blockUser: { id: true },
        createdAt: true,
      },
      where: {
        user: { id: userId },
      },
      relations: {
        blockUser: true,
      },
    });
  }
}
