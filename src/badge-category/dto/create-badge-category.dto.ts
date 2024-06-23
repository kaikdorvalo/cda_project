import { IsNotEmpty, IsString } from "class-validator";

export class CreateBadgeCategoryDto {

    @IsString()
    @IsNotEmpty()
    categoryName: string;
}
