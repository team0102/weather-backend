export class CreateFeedDTO {
   
    readonly userId: number;

    readonly weatherConditionId: number;

    readonly highTemperature: number;

    readonly lowTemperature: number;

    readonly image: string;

    readonly content: string;

    readonly tag: string[];
}