import { TableEnum } from "common/enums/tables.enum";
import { Badge } from "src/badge/entities/bagde.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToMany(() => Badge, badge => badge.users)
    @JoinTable()
    badges: Badge[];

    @Column()
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
