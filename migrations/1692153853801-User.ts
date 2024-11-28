import { 
    MigrationInterface, 
    QueryRunner, 
    Table,
    TableForeignKey,
} from "typeorm"

export class User1692153853801 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('executing create tables roles and users')

        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: 'username',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        name: 'firstname',
                        type: 'varchar'
                    },
                    {
                        name: 'lastname',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP'
                    }
                ]
            }),
            true,
        ),
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    { 
                        name: 'id', 
                        type: 'int', 
                        isPrimary: true, 
                        isGenerated: true, 
                        generationStrategy: 'increment' 
                    },
                    { name: 'name', type: 'varchar', isUnique: true },
                ],
            }),
        ),

        await queryRunner.createTable(
            new Table({
                name: 'user_roles',
                columns: [
                    { name: 'usernameAccount', type: 'varchar', isPrimary: true },
                    { name: 'role_id', type: 'int', isPrimary: true },
                ],
            }),
        );
        await queryRunner.createForeignKeys(
            "user_roles",
            [
                new TableForeignKey({
                    columnNames: ["usernameAccount"],
                    referencedColumnNames: ["username"],
                    referencedTableName: "user",
                    onDelete: "CASCADE"
                }),
                new TableForeignKey({
                    columnNames: ['role_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'roles',
                    onDelete: 'CASCADE',
                })
            ]
        ),

        console.log('executing insert roles and users')
        await queryRunner.query(`
            INSERT INTO roles (name) 
            VALUES 
                ('superadmin'),
                ('admin'),
                ('user')
        `);
        
        await queryRunner.query(`
            INSERT INTO user (username, password, firstname, lastname, email) 
            VALUES ('superadmin', '$2a$15$kmzOyICI0Lov4g85ug/mnORlWms16L8IP0q30Q/ZuvSwBtTj.bSSq', 'Super', 'Admin', 'superadmin@example.com')
        `)
        await queryRunner.query(`
            INSERT INTO user_roles (usernameAccount, role_id) 
            SELECT 'superadmin', id FROM roles WHERE name = 'superadmin'
        `);
        console.log('ended executing insert roles and users')

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_roles')
        await queryRunner.dropTable("user")
        await queryRunner.dropTable('roles')
    }

}
