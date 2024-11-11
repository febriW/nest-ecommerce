import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt"

@Entity()
export class User {
    @PrimaryColumn({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({default: 'testing@testing.com'})
    email: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at : Date;

    @CreateDateColumn({type: 'timestamp'})
    updated_at : Date;

    @BeforeInsert()
    async hashingPassword() {
        this.password = await bcrypt.hash(this.password, 15)
    }

    constructor(user: Partial<User>) {
        Object.assign(this, user)
    }
}
