import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { BadgeCategoryService } from './badge-category.service';
import { CreateBadgeCategoryDto } from './dto/create-badge-category.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('badge-categories')
export class BadgeCategoryController {
  constructor(private readonly badgeCategoryService: BadgeCategoryService) { }

  @Post('create')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new badge category' })
  @ApiResponse({ status: 201, description: 'Emblema criado.' })
  @ApiResponse({ status: 400, description: 'Emblema já está criado.' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  async create(@Body() createBadgeCategoryDto: CreateBadgeCategoryDto, @Req() request: any) {
    return await this.badgeCategoryService.create(createBadgeCategoryDto, request.user.sub);
  }

  @Get('populate')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Populate the database with categories' })
  @ApiResponse({ status: 201, description: 'Banco populado.' })
  @ApiResponse({ status: 400, description: 'Emblema já está criado.' })
  @ApiResponse({ status: 500, description: 'Erro interno.' })
  async populateBadgeCategories(@Req() request: any) {
    return await this.badgeCategoryService.populateBadgeCategories(request.user.sub);
  }
}
