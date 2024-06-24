import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBadgeCategoryDto } from './dto/create-badge-category.dto';
import { BadgeCategory } from './entities/badge-category.entity';
import { Repository } from 'typeorm';
import { BadgeCategoryData } from './badge-category-data';
import { BadgeCategoryExistsException } from './exceptions/badge-category-exists.exception';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BadgeCategoryService {
  constructor(
    @Inject('BADGE_CATEGORIES_REPOSITORY')
    private badgeCategoriesRepository: Repository<BadgeCategory>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) { }

  async create(createBadgeCategoryDto: CreateBadgeCategoryDto, userId: number) {
    let badgeName = createBadgeCategoryDto.categoryName;
    badgeName = badgeName.toLowerCase();
    badgeName = badgeName.charAt(0).toUpperCase() + badgeName.slice(1);
    createBadgeCategoryDto.categoryName = badgeName;
    const exists = await this.badgeCategoriesRepository.findOneBy({ categoryName: createBadgeCategoryDto.categoryName });
    if (!exists) {
      throw new BadgeCategoryExistsException();
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    const newCategory = this.badgeCategoriesRepository.create(createBadgeCategoryDto);
    newCategory.createdBy = user;
    newCategory.active = true;
    const badge = await this.badgeCategoriesRepository.save(newCategory);
    return badge;
  }

  async populateBadgeCategories(userId: number) {
    let badgeCategoriesPromises = [];
    console.log(userId)
    for (let badgeCategory of BadgeCategoryData) {
      const user = await this.userRepository.findOneBy({ id: userId });
      const newBadgeCategory = this.badgeCategoriesRepository.create(badgeCategory);
      newBadgeCategory.createdBy = user;
      newBadgeCategory.active = true;
      badgeCategoriesPromises.push(this.badgeCategoriesRepository.save(newBadgeCategory));
    }

    await Promise.all(badgeCategoriesPromises);

    return 'Categorias carregadas';
  }
}
