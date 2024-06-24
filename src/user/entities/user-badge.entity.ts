import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Badge } from "src/badge/entities/bagde.entity";
import { TableEnum } from "common/enums/tables.enum";
import { BadgeCategory } from "src/badge-category/entities/badge-category.entity";


@Entity({ name: TableEnum.USER_BADGE })
export class UserBadge {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    redeemedAt: Date

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Badge)
    badge: Badge;
}