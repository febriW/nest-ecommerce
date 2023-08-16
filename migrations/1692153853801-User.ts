import { 
    MigrationInterface, 
    QueryRunner, 
    Table    
} from "typeorm"

export class User1692153853801 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
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
                        default: "Date.now()"
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp'
                    }
                ]
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user")
    }

}
