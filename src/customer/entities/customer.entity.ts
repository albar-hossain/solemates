import { Column, PrimaryGeneratedColumn, OneToMany, Entity, Generated, BeforeInsert, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn} from 'typeorm';
import { CustomerProfile } from './customerprofile.entity';

@Entity("customer")
export class CustomerEntity{
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

    @OneToOne(() => CustomerProfile, CustomerProfile => CustomerProfile.CustomerEntity, { cascade: true
    })
    @JoinColumn()
    CustomerProfile : CustomerProfile;
    

}


