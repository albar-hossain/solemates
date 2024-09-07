import { OrderEntity } from 'src/order/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, ManyToMany } from 'typeorm';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'fullName', type: 'varchar', length: 100 })
  fullName: string;

  @Column({ name: 'userName', type: 'varchar', length: 100, unique: true })
  userName: string;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  password: string;

  @Column({
    nullable: true,
    name: 'filename',
    type: 'varchar',
    length: 500,
  })
  filename: string;

  @OneToMany(() => OrderEntity, (order) => order.customer, { cascade: true })
  orders?: OrderEntity[];   
//   @ManyToMany(() = OrderEntity,(order) => order.product)
//   orders: OrderEntity[];

}
