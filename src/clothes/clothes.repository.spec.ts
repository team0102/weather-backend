import { Test, TestingModule } from '@nestjs/testing';
import { ClothesRepository } from './clothes.repository';
import { ClothEntity } from 'src/entities/clothes.entity';

describe('ClothesRepository', () => {
  let repository: ClothesRepository;
  let mockClothEntities: ClothEntity[];
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClothesRepository],
    }).compile();

    repository = module.get<ClothesRepository>(ClothesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
