import { OrderEntity } from "src/order/entities/order.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn({ name: 'productId', type: 'int' })
  productId: number;

  @Column({ name: 'brand', type: 'varchar', length: 100 })
  brand: string;

  @Column({ name: 'size', type: 'varchar', length: 10 })
  size: string;

  @Column({ name: 'color', type: 'varchar', length: 10 })
  color: string;

  @Column({ nullable: true, name: 'price', type: 'int' })
  price: number;

  // @OneToMany(() => GradeEntity, (grade) => grade.product)
  // grades: GradeEntity[];
  
  @ManyToMany(() => OrderEntity, (order) => order.products)
  orders: OrderEntity[];

  // @OneToMany(() => AssignmentEntity, (assignment) => assignment.product)
  // assignments: AssignmentEntity[];

}
