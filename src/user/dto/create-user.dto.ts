import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    @IsOptional()
    photo: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;
}
