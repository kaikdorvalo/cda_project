import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { EmailExistsException } from './exceptions/email-exists.exception';

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const exists = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (exists) {
      throw new EmailExistsException();
    }

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALTS))
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    const dateNow = new Date();
    createUserDto.active = true;
    createUserDto.createdAt = dateNow;
    createUserDto.updatedAt = dateNow;

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string) {
    try {
      return this.userRepository.findOneBy({ email: email });
    } catch (error) {
      return null;
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
