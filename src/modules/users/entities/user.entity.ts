import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt"
import { Roles } from "src/modules/roles/entities/roles.entity";

@Entity()
export class User {
    @PrimaryColumn({unique: true})
    username: string;

    @ManyToOne(() => Roles, (role) => role.users, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Roles

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
    @BeforeUpdate()
    async hashingPassword() {
        this.password = await bcrypt.hash(this.password, 15)
    }

    constructor(user: Partial<User>) {
        Object.assign(this, user)
    }
}
