import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt"
import { Roles } from "src/modules/roles/entities/roles.entity";

@Entity()
export class User {
    @PrimaryColumn({unique: true})
    username: string;

    @ManyToMany(() => Roles, (role) => role.users, { cascade: true, eager: true })
    @JoinTable({
        name: 'user_roles',
        joinColumn: { name: 'usernameAccount', referencedColumnName: 'username' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })
    roles: Roles[]

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
