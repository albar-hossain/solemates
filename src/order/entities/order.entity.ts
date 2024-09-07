import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'orderId', type: 'int' })
  orderId: number;

  @Column({ name: 'orderDate', type: 'date' })
  orderDate: Date;

  @Column({ nullable: true, name: 'totalAmount', type: 'int' })
  totalAmount: number;

  @Column({ name: 'shippingAddress', type: 'varchar', length: 200 })
  shippingAddress: string;



  // @OneToMany(() => OrderEntity, (order) => order.faculty)
  // orders: OrderEntity[];

  // @OneToMany(() => ArticleEntity, (article) => article.faculty)
  // articles: ArticleEntity[];

  
  // @OneToOne(() => ProfileEntity, profile => profile.faculty)
  // @JoinColumn()
  // profile: ProfileEntity;

  // @ManyToOne(() => CourseEntity, (course) => course.orders)
  // course: CourseEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  customer: CustomerEntity;

  @ManyToMany(() => ProductEntity, (product) => product.orders)
  products: ProductEntity[];
  
}
