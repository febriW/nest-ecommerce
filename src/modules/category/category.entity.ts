import { Product } from "src/modules/product/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[]
}