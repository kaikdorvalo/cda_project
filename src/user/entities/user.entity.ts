import { TableEnum } from "common/enums/tables.enum";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserBadge } from "./user-badge.entity";
import { BadgeCategory } from "src/badge-category/entities/badge-category.entity";

@Entity({ name: TableEnum.USER })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ nullable: true })
    photo: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @ManyToMany(() => UserBadge, userBadge => userBadge.user)
    userBadges: UserBadge[];

    @Column()
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => BadgeCategory, badgeCategory => badgeCategory.id)
    badgeCategory: BadgeCategory[];
}
