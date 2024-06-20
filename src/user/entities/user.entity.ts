import { TableEnum } from "common/enums/tables.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    active: boolean

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}
