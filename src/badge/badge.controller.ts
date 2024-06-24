import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Req, Res, HttpStatus, Query } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { HttpExceptionFilter } from 'common/exception-filter/http-exception.filter';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { request } from 'http';
import { Request, Response, response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('badges')
@UseFilters(HttpExceptionFilter)
export class BadgeController {
  constructor(private readonly bagdeService: BadgeService) { }

  @Post('create')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new Badge' })
  @ApiResponse({ status: 201, description: 'Emblema criado.' })
  @ApiResponse({ status: 409, description: 'O emblema já existe.' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  create(@Body() createBagdeDto: CreateBadgeDto) {
    return this.bagdeService.create(createBagdeDto);
  }

  @Get('populate')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Populate the database with badges' })
  @ApiResponse({ status: 201, description: 'Banco de dados populado.' })
  @ApiResponse({ status: 400, description: 'Emblema já existe.' })
  @ApiResponse({ status: 409, description: 'Nenhuma categoria de embelha encontrada.' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  async populateBadges() {
    return this.bagdeService.populateBadges();
  }

  @Get('random')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Redeem random badge' })
  @ApiResponse({ status: 200, description: 'Emblema resgatado.' })
  @ApiResponse({ status: 404, description: 'Todos os emblemas já foram resgatados' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  async getRandomBadgeNotOwnedByUser(@Req() request: any, @Res() response: Response) {
    const result = await this.bagdeService.getRandomBadgeNotOwnedByUser(request.user.sub);
    if (result === null) {
      return response.status(HttpStatus.NOT_FOUND).send('Todos os emblemas já foram resgatados.');
    } else {
      return response.status(HttpStatus.OK).send(result);
    }
  }

  @Get('all')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all badges' })
  @ApiQuery({ name: 'name', required: false })
  @ApiResponse({ status: 200, description: 'Busca bem sucedida.' })
  @ApiResponse({ status: 400, description: 'Número da página inválido' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  async findAll(@Query('page') page: number, @Query('name') name: string) {
    return await this.bagdeService.findAll(page, name);
  }

  @Post('redeem/:slug')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Redeen a badge by slug' })
  @ApiResponse({ status: 201, description: 'Emblema resgatado.' })
  @ApiResponse({ status: 404, description: 'Emblema não encontrado ou já resgatado.' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  @UseGuards(AuthGuard)
  async getBadgeNotOwnedByUser(@Param('slug') slug: string, @Req() request: any) {
    return await this.bagdeService.getBadgeNotOwnedByUser(request.user.sub, slug);
  }
}
