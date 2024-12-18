import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

// Join Table for relations many to many product to category
export class ProductCategory1733475048139 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "product_category",
            columns: [
              {
                name: "productId",
                type: "varchar",
                isPrimary: true,
              },
              {
                name: "categoryId",
                type: "varchar",
                isPrimary: true,
              },
            ],
          }),
          true
        );
    
        await queryRunner.createForeignKey(
          "product_category",
          new TableForeignKey({
            columnNames: ["productId"],
            referencedColumnNames: ["id"],
            referencedTableName: "product",
            onDelete: "CASCADE",
          })
        );
    
        await queryRunner.createForeignKey(
          "product_category",
          new TableForeignKey({
            columnNames: ["categoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "category",
            onDelete: "CASCADE",
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product_category");
      }

}
