import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { User } from "src/modules/users/entities/user.entity";

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[]
}