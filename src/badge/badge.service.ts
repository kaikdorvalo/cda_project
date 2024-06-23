import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { Repository } from 'typeorm';
import { Badge } from './entities/bagde.entity';
import { BadgeExistsException } from './exceptions/badge-exists.exception';
import { BadgesData } from './badges-data';
import { UserBadge } from 'src/user/entities/user-badge.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BadgeService {
  constructor(
    @Inject('BADGE_REPOSITORY')
    private badgeRepository: Repository<Badge>,
    @Inject('USER_BADGE_REPOSITORY')
    private userBadgeRepository: Repository<UserBadge>,
    @Inject('USER_REPOSITORY')
    private userRepsitory: Repository<User>
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
    let badgesPromises = []
    for (let badge of BadgesData) {
      const newBadge = this.badgeRepository.create(badge);
      newBadge.active = true;
      badgesPromises.push(this.badgeRepository.save(newBadge));
    }

    await Promise.all(badgesPromises);

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

}
