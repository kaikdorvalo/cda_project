import { TableEnum } from "common/enums/tables.enum";
import { UserBadge } from "../../user/entities/user-badge.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BadgeCategory } from "src/badge-category/entities/badge-category.entity";

@Entity({ name: TableEnum.BADGE })
export class Badge {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @ManyToMany(() => UserBadge, userBadge => userBadge.badge)
    userBadges: UserBadge[];

    @Column()
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(() => BadgeCategory, badgeCategory => badgeCategory.id)
    badgeCategory: BadgeCategory;
}
