export class ClothesTopDto {
  readonly id: number;

  readonly type: string;

  readonly imageUrl: string;
}

export class ClothesBottomDto {
  readonly id: number;

  readonly type: string;

  readonly imageUrl: string;
}

export class ClothesCoatDto {
  readonly id: number;

  readonly type: string;

  readonly imageUrl: string;
}

export class ClothesAccessoryDto {
  readonly id: number;

  readonly type: string;

  readonly imageUrl: string;
}

export class ClothesDto {
  readonly id: number;

  readonly clothesTopId: ClothesTopDto;

  readonly clothesBottomId: ClothesBottomDto;

  readonly clothesCoatId: ClothesCoatDto;

  readonly clothesAccessoryId: ClothesAccessoryDto;
}

export class ClothesResponseDto {
  status: number;
  message: string;
  data?: ClothesDto[];
}
