import { Column, PrimaryGeneratedColumn, OneToMany, Entity, Generated, BeforeInsert, PrimaryColumn, CreateDateColumn, OneToOne, JoinColumn} from 'typeorm';


@Entity("manager")
export class ManagerEntity{
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
    

}


