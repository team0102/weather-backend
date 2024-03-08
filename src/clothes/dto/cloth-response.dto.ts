import { ClothEntity } from './../../entities/clothes.entity';
import { ClothCoatEntity } from 'src/entities/clothesCoat.entity';
import { ClothBottomEntity } from './../../entities/clothesBottom.entity';
import { ClothTopEntity } from './../../entities/clothesTop.entity';
import { ClothAccessoryEntity } from 'src/entities/clothesAccessory.entity';

export class ClothesTopDto {
  readonly id: number;

  readonly type: string;

  readonly imageUrl: string;

  constructor(clothTopEntity: ClothTopEntity) {
    this.id = clothTopEntity.id;
    this.type = clothTopEntity.type;
    this.imageUrl = clothTopEntity.image;
  }
}

export class ClothesBottomDto {
  readonly id: number;

  readonly type: string;

  readonly imageUrl: string;

  constructor(clothBottomEntity: ClothBottomEntity) {
    this.id = clothBottomEntity.id;
    this.type = clothBottomEntity.type;
    this.imageUrl = clothBottomEntity.image;
  }
}

export class ClothesCoatDto {
  readonly id: number;

  readonly type: string;

  readonly imageUrl: string;

  constructor(clothCoatEntity: ClothCoatEntity) {
    this.id = clothCoatEntity.id;
    this.type = clothCoatEntity.type;
    this.imageUrl = clothCoatEntity.image;
  }
}

export class ClothesAccessoryDto {
  readonly id: number;

  readonly type: string;

  readonly imageUrl: string;

  constructor(clothAccessoryntity: ClothAccessoryEntity) {
    this.id = clothAccessoryntity.id;
    this.type = clothAccessoryntity.type;
    this.imageUrl = clothAccessoryntity.image;
  }
}

export class ClothesDto {
  readonly id: number;

  readonly clothesTopId: ClothesTopDto;

  readonly clothesBottomId: ClothesBottomDto;

  readonly clothesCoatId: ClothesCoatDto;

  readonly clothesAccessoryId: ClothesAccessoryDto;

  constructor(clothEntity: ClothEntity) {
    this.id = clothEntity.id;
    this.clothesTopId = new ClothesTopDto(clothEntity.clothesTopId);
    this.clothesBottomId = new ClothesBottomDto(clothEntity.clothesBottomId);
    this.clothesCoatId = new ClothesCoatDto(clothEntity.clothesCoatId);
    this.clothesAccessoryId = clothEntity.clothesAccessoryId
      ? new ClothesAccessoryDto(clothEntity.clothesAccessoryId)
      : null;
  }
}

export class ClothesResponseDto {
  status: number;
  message: string;
  data?: ClothesDto[];
}
