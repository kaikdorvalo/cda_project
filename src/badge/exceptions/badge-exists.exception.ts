import { HttpException, HttpStatus } from "@nestjs/common";

export class BadgeExistsException extends HttpException {
    constructor() {
        super('Emblema já existe no banco de dados', HttpStatus.CONFLICT);
    }
}