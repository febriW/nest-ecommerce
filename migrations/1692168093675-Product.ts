import { 
    MigrationInterface, 
    QueryRunner, 
    Table, 
    TableForeignKey } from "typeorm"

export class Product1692168093675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'product',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'stock',
                        type: 'int'
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product")
    }

}
