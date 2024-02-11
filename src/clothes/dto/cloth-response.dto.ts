export type ClothesTopDto = {
  readonly id: number;

  readonly type: string;

  readonly image: string;
};

export type ClothesBottomDto = {
  readonly id: number;

  readonly type: string;

  readonly image: string;
};

export type ClothesCoatDto = {
  readonly id: number;

  readonly type: string;

  readonly image: string;
};

export type ClothesAccessoryDto = {
  readonly id: number;

  readonly type: string;

  readonly image: string;
};

export type ClothesDto = {
  readonly id: number;

  readonly clothesTopId: ClothesTopDto;

  readonly clothesBottomId: ClothesBottomDto;

  readonly clothesCoatId: ClothesCoatDto;

  readonly clothesAccessoryId: ClothesAccessoryDto;
};

export type ClothesResponseDto = {
  status: number;
  message: string;
  data?: ClothesDto[];
};
