import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { Like, Repository } from 'typeorm';
import { Badge } from './entities/bagde.entity';
import { BadgeExistsException } from './exceptions/badge-exists.exception';
import { BadgesData } from './badges-data';
import { UserBadge } from 'src/user/entities/user-badge.entity';
import { User } from 'src/user/entities/user.entity';
import { BadgeCategory } from 'src/badge-category/entities/badge-category.entity';

@Injectable()
export class BadgeService {
  constructor(
    @Inject('BADGE_REPOSITORY')
    private badgeRepository: Repository<Badge>,
    @Inject('USER_BADGE_REPOSITORY')
    private userBadgeRepository: Repository<UserBadge>,
    @Inject('USER_REPOSITORY')
    private userRepsitory: Repository<User>,
    @Inject('BADGE_CATEGORIES_REPOSITORY')
    private badgeCategoresRepository: Repository<BadgeCategory>
  ) { }

  async create(createBagdeDto: CreateBadgeDto) {


    const exists = await this.badgeRepository.findOneBy({ slug: createBagdeDto.slug });
    if (exists) {
      throw new BadgeExistsException();
    }

    const badge = this.badgeRepository.create(createBagdeDto);

    return await this.badgeRepository.save(badge);
  }


  async populateBadges() {
    let badgeCategories = await this.badgeCategoresRepository.find();
    let badgesPromises = []
    if (badgeCategories.length !== 0) {
      for (let badge of BadgesData) {
        let randomIndex = Math.floor(Math.random() * badgeCategories.length);
        const newBadge = this.badgeRepository.create(badge);
        newBadge.active = true;
        newBadge.badgeCategory = badgeCategories[randomIndex];
        badgesPromises.push(this.badgeRepository.save(newBadge));
      }
    } else {
      throw new HttpException('Nenhuma categoria de embelha encontrada.', HttpStatus.CONFLICT)
    }

    await Promise.all(badgesPromises)
      .catch((el) => {
        throw new HttpException('bad request', HttpStatus.BAD_REQUEST);
      })

    return 'Badges carregadas';
  }

  async getRandomBadgeNotOwnedByUser(userId: number) {
    const query = `
      SELECT id, slug, name, image
      FROM badge
      WHERE badge.id NOT IN (
        SELECT badge.id
        FROM badge
        INNER JOIN user_badge ub ON badge.id = ub.badgeId
        WHERE ub.userId = ?
      )
    `;

    const badgesNotOwnedByUser: Array<Badge> = await this.badgeRepository.query(query, [userId])
    if (badgesNotOwnedByUser.length > 0) {
      const randomIndex = Math.floor(Math.random() * badgesNotOwnedByUser.length);
      const badge = badgesNotOwnedByUser[randomIndex]
      const user = await this.userRepsitory.findOneBy({ id: userId });

      const userBadge = new UserBadge();
      userBadge.badge = badge;
      userBadge.user = user;

      const newBadge = this.userBadgeRepository.create(userBadge);
      return this.userBadgeRepository.save(newBadge)
        .then(() => {
          return badge;
        }).catch(() => {
          throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR);
        })
    } else {
      return null;
    }
  }

  async getBadgeNotOwnedByUser(userId: number, slug: string) {
    const query = `
    select available.*
    FROM
      (SELECT id, slug, name, image
      FROM badge
      WHERE badge.id NOT IN (
        SELECT badge.id
        FROM badge
        INNER JOIN user_badge ub ON badge.id = ub.badgeId
        WHERE ub.userId = ?
      )) available
    WHERE available.slug = ?
    `

    const foundBadge: Badge[] = await this.userBadgeRepository.query(query, [userId, slug]);
    console.log(userId)

    if (foundBadge.length == 0) {
      throw new HttpException(`Emblema não encontrado ou já resgatado.`, HttpStatus.NOT_FOUND);
    }

    const user = await this.userRepsitory.findOneBy({ id: userId })
    console.log(user)

    const newUserBadge = this.userBadgeRepository.create();
    newUserBadge.user = user;
    newUserBadge.badge = foundBadge[0];

    return await this.userBadgeRepository.save(newUserBadge)
      .then((created) => {
        return `Emblema ${created.badge.name} resgatado com sucesso`
      })
      .catch(() => { throw new HttpException('Erro interno', HttpStatus.INTERNAL_SERVER_ERROR) })
  }

  async findAll(page: number, name: string) {
    let badges = 0;
    if (name !== undefined) {
      badges = await this.badgeRepository.count({ where: { name: Like(`%${name}%`) } });
    } else {
      badges = await this.badgeRepository.count();
    }
    let pages = 1;
    if (badges > 0) {
      pages = Math.ceil(badges / 5);
    }

    if (page <= pages && page > 0) {
      let skip = page - 1;
      let find: Badge[];
      if (name !== undefined) {
        find = await this.badgeRepository.find({ skip: skip * 5, take: 5, where: { name: Like(`%${name}%`) } })
      } else {
        find = await this.badgeRepository.find({ skip: skip * 5, take: 5 })
      }

      return {
        pages: pages,
        page: Number(page),
        badges: find
      }
    } else {
      throw new HttpException(`O máximo de páginas é ${pages}`, HttpStatus.BAD_REQUEST);
    }
  }

}
