import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator"

export class UserSignInDto {

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    password: string;
}