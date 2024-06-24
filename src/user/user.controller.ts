import { Controller, Get, Post, Body, Param, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpExceptionFilter } from 'common/exception-filter/http-exception.filter';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Usuário já existe.' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/:id/badges')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get badges from a user by user id' })
  @ApiResponse({ status: 201, description: 'Emblemas encontrados.' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  findAll(@Param('id') id: number) {
    return this.userService.getUserBadges({ id: id });
  }
}
