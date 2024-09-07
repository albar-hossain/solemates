import { HttpException, HttpStatus, Injectable, NotFoundException, ParseIntPipe } from "@nestjs/common";
import { CustomerEntity } from "../Customer/entities/customer.entity";
import { CustomerDTO, loginDTO, UpdateCustomerDTO } from "../Customer/dto/customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class CustomerService {
    constructor(@InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>,
    private mailerService: MailerService,
        private jwtService: JwtService

    ) { }
    async addCustomer(myobj: CustomerEntity): Promise<CustomerEntity> {
        return await this.customerRepo.save(myobj);
    }
    async findOne(logindata: loginDTO): Promise<any> {
        return await this.customerRepo.findOneBy({ email: logindata.email });
    }
    async getAllCustomer(): Promise<CustomerEntity[]> {
        return await this.customerRepo.find();
    }
    async findOneByUsername(username: string): Promise<CustomerEntity> {
        return this.customerRepo.findOne({
            where: { username: username },
        });
    }
    async showProfile(email: string): Promise<CustomerEntity> {
        const user = await this.customerRepo.findOne({ where: { email } });
    
        if (!user) {
            throw new NotFoundException(`User with username ${email} not found`);
        }
    
        return user;
    }
    


    async updateOrder(id: number, customerDTO: CustomerDTO): Promise<CustomerEntity> {
        await this.customerRepo.update(id, customerDTO);
        return this.getOrderById(id);
    }
    async getOrderById(id: number): Promise<CustomerEntity> {
        const idString = id.toString();
        return this.customerRepo.findOneBy({ customerId: idString });
    }
    async remove(id: number): Promise<void> {
        await this.customerRepo.delete(id);
    }
    getOrderByNameAndId(name, id): object {
        console.log(id, name);
        return { message: "your id is " + id + " and your name is " + name };
    }

    //semd mail
    sendMail() : void {
    this.mailerService.sendMail({
    to: 'albarhossain@gmail.com', 
    from: 'solemates.bd.2024@gmail.com', 
    subject: 'Welcome to Bangladesh\'s premier sneaker marketplace',
    text: 'Welcome', 
    html: '<b>Welcome User, Thank You for signing up.</b>', 
    })
}

    async search(logindata: loginDTO): Promise<CustomerEntity> {
        return await this.customerRepo.findOneBy({ email: logindata.email });
    }

    //DB Find
    async findByFullName(substring: string): Promise<CustomerEntity[]> {
        return this.customerRepo.find({
            where: { name: Like(`%${substring}%`) },
        });
    }

    async findOneByCustomerUsername(username: string): Promise<CustomerEntity> {
        return this.customerRepo.findOne({
            where: { username: username },
        });
    }
 
    //
    async getCustomerByID(id) {
        const data=await this.customerRepo.findOneBy({ customerId: id });
        console.log(data);
        if(data!==null) {
            return data;
        }
        else 
        {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    
    }
    
    async updateCustomerById(id: string, data: UpdateCustomerDTO): Promise<CustomerEntity> {
        await this.customerRepo.update(id, data);
        return this.customerRepo.findOneBy({ customerId: id });  
    }

}