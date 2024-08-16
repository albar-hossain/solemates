import { Column, PrimaryGeneratedColumn, OneToMany, Entity, Generated, BeforeInsert, PrimaryColumn, CreateDateColumn} from 'typeorm';

@Entity("customer")
export class CustomerEntity{

    // @Column({type: 'varchar', length:50})
    // name: string;
    // @Column()
    // email: string;
    // @Column()
    // password: string;

    // @PrimaryGeneratedColumn() 
    // customer_id: number;
  
    // @Column({ type: 'varchar', length: 100, unique: true })
    // email: string;
    // @Column({ type: 'varchar' })
    // password: string;
    // @Column({name:'fulName', type: 'varchar', length: 150 })
    // name: string;
    // @Column()
    // address: string;
    // @Column()
    // filename: string;


    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: 'fullname', type: "varchar", length: 150 })
    fullname: string;
    @Column({ type: "varchar", length: 150, unique: true  })
    email: string;
    @Column()
    phone: string;
    @Column({ type: 'varchar' })
    password: string;
    @Column()
    filenames: string;

//     @OneToMany(() => Manager, manager => manager.customer)
//  managers: Manager[];

}


