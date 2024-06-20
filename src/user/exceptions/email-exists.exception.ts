import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";

export class EmailExistsException extends HttpException {
    constructor() {
        super('O email já está em uso.', HttpStatus.BAD_REQUEST);
    }
}