import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity("customer")
export class CustomerProfile{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;

//     @OneToMany(() => Manager, manager => manager.customer)
//  managers: Manager[];

}

