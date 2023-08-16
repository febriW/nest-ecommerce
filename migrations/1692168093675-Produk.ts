import { 
    MigrationInterface, 
    QueryRunner, 
    Table, 
    TableForeignKey } from "typeorm"

export class Produk1692168093675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'produk',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true
                    },
                    {
                        name: 'category',
                        type: 'varchar'
                    },
                    {
                        name: 'nama',
                        type: 'varchar',
                    },
                    {
                        name: 'stok',
                        type: 'int'
                    }
                ]
            })
        ),
        await queryRunner.createForeignKey(
            "produk",
            new TableForeignKey({
                columnNames: ["category"],
                referencedColumnNames: ["id"],
                referencedTableName: "category",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
