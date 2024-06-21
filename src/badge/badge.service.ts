import { Inject, Injectable } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { Repository } from 'typeorm';
import { Badge } from './entities/bagde.entity';
import { BadgeExistsException } from './exceptions/badge-exists.exception';
import { BadgesData } from './badges-data';

@Injectable()
export class BadgeService {
  constructor(
    @Inject('BADGE_REPOSITORY')
    private badgeRepository: Repository<Badge>
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

  async getRandomBadge(userId: number) {
    const query = `
      SELECT id, slug, name, image
      FROM badge
      WHERE badge.id NOT IN (
        SELECT badge.id
        FROM badge
        INNER JOIN user_badges_badge ub ON badge.id = ub.badgeId
        WHERE ub.userId = ?
      )
    `;

    const badgesNotOwnedByUser = await this.badgeRepository.query(query, [userId])

    console.log(badgesNotOwnedByUser)

  }

}
