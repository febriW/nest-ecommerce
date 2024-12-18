import { Category } from "src/modules/category/category.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    stock: number

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: "product_category",
        joinColumn: { name: "productId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "categoryId", referencedColumnName: "id" },
    })
    categories: Category[]

}