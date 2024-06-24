import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { EmailExistsException } from './exceptions/email-exists.exception';
import { UserBadge } from './entities/user-badge.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,
    @Inject('USER_BADGE_REPOSITORY')
    private userBadgeRepository: Repository<UserBadge>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const exists = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (exists) {
      throw new EmailExistsException();
    }

    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALTS))
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.active = true;

    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findOneByEmail(email: string) {
    try {
      return this.userRepository.findOneBy({ email: email });
    } catch (error) {
      return null;
    }
  }

  async getUserBadges(userId: Partial<User>) {
    return this.userBadgeRepository.find({ where: { user: userId } })
  }
}
