import { IsNotEmpty, IsString } from "class-validator"

export class CreateBadgeDto {

    @IsString()
    @IsNotEmpty()
    slug: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    image: string
}
