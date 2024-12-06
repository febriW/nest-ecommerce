import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { User } from "src/modules/users/entities/user.entity";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[]
}