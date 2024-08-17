
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, 
    JoinColumn } from 'typeorm';
  import { CustomerEntity } from './customer.entity';

@Entity("CustomerProfile")
    export class CustomerProfile {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    age: number;
    @Column()
    telephone: number;
    @OneToOne(() => CustomerEntity, CustomerEntity => CustomerEntity.CustomerProfile)
    CustomerEntity: CustomerEntity;
    }
