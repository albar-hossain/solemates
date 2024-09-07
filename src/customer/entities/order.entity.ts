import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { ProductEntity } from "./product.entity";

@Entity("order")
export class OrderEntity {

    @PrimaryGeneratedColumn({ name: 'orderId', type: 'int' })
    orderId: number;

    @Column({ name: 'orderDate', type: 'date' })
    orderDate: Date;

    @Column({ nullable: true, name: 'quantity', type: 'int' })
    orderQuantity: number;

    @Column({ nullable: true, name: 'totalAmount', type: 'int' })
    totalAmount: number;

    @Column({ name: 'shippingAddress', type: 'varchar', length: 200 })
    shippingAddress: string;

    @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
    customer: CustomerEntity;

    @ManyToMany(() => ProductEntity, (product) => product.orders, { cascade: true })
    @JoinTable()
    products: ProductEntity[];
}