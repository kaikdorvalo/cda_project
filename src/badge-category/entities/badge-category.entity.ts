import { TableEnum } from "common/enums/tables.enum";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(() => User, user => user.id)
    @JoinColumn()
    createdBy: User
}
