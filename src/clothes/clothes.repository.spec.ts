import { Test, TestingModule } from '@nestjs/testing';
import { ClothesRepository } from './clothes.repository';

describe('ClothesRepository', () => {
  let clothesRepository: ClothesRepository;

  const mockEntity = {
    id: 1,
    lowPerceivedTemperature: 0,
    highPerceivedTemperature: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClothesRepository,
      ],
    }).compile();

    clothesRepository = module.get<ClothesRepository>(ClothesRepository);
  });

  describe('getClothesSetIdByTemperature', () => {
    it('getClothesSetIdByTemperature 성공', async () => {
   
    });
  });
});
