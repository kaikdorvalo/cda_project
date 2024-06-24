import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBadgeCategoryDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    categoryName: string;
}
