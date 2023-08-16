import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column({default: '2023-08-01' })
    created_at : Date;

    @Column()
    updated_at : Date;

    constructor(user: Partial<User>) {
        Object.assign(this, user)
    }
}
