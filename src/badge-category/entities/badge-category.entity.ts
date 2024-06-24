import { TableEnum } from "common/enums/tables.enum";
import { Badge } from "src/badge/entities/bagde.entity";
import { UserBadge } from "src/user/entities/user-badge.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: TableEnum.BADGE_CATEGORY })
export class BadgeCategory {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({ nullable: false, unique: true })
    categoryName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    active: boolean;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    createdBy: User;

    @ManyToMany(() => Badge, badge => badge.badgeCategory)
    badge: Badge[];
}
