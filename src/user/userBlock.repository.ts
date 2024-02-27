import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserBlockEntity } from 'src/entities/userBlocks.entity';
import { UserBlockDto } from './dto/user.dto';

@Injectable()
export class UserBlockRepository {
  constructor(
    @InjectRepository(UserBlockEntity)
    private readonly userBlockTypeormRepository: Repository<UserBlockEntity>,
  ) {}
  
  async findBlockRelation(
    userBlock: UserBlockDto,
  ): Promise<UserBlockEntity | null> {
    const { userId, blockUserId } = userBlock;

    return this.userBlockTypeormRepository.findOneBy({
      user: { id: userId },
      blockUser: { id: blockUserId },
    });
  }

  async createUserBlock(userBlock: UserBlockEntity): Promise<void> {
    await this.userBlockTypeormRepository.save(userBlock);
  }
  
  async deleteUserBlock(isBlocked: UserBlockEntity): Promise<void> {
    await this.userBlockTypeormRepository.remove(isBlocked);
  }
  
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
