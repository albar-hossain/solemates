import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity'
import { CustomerDTO } from './dto/cutomer.dto';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
// import { Manager } from "../manager/manager.entity";

@Injectable()
export class CustomerService {

async signup(data: CustomerDTO): Promise<CustomerEntity> {
  const salt = await bcrypt.genSalt();
  data.password = await bcrypt.hash(data.password, salt);
  return this.customerRepo.save(data);
  }

  constructor(
    @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
    private mailerService: MailerService
    // @InjectRepository(Manager)  private managerRepo: Repository<Manager>
){}

  create(createCustomerDto: CustomerDTO) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: CustomerDTO) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  //new Code from here

  //semd mail
  sendMail() : void {
    this.mailerService.sendMail({
      to: 'thexfiles163@gmail.com', 
      from: 'albarhossain@gmail.com', 
      subject: 'Welcome to Bangladesh\'s premier sneaker marketplace',
      text: 'Welcome', 
      html: '<b>Welcome User, Thank You for signing up.</b>', 
    })
  }

  getCustomerById(id: number): object{
    return {message: "Customer id:  "+id };
    }
    getCustomerByNameAndId(name: string, id: number): object{
    return {message: "Customer name: "+name+" id:"+ id};
    }
    getCustomer(myobj:object): object{
    return myobj;
  }
  //Add new customer to DB
    addCustomer(myobj:CustomerDTO): Promise<CustomerEntity>{
    return this.customerRepo.save(myobj);
  }

  //Show all customer from DB NOT WORKING
  getAllCustomer(): Promise<CustomerEntity[]> {
    return this.customerRepo.find();
  }

  getCustomerByIdDB(id: number): Promise<CustomerEntity> {
    return this.customerRepo.findOneBy({ id: id });
  }


  async updateCustomerByIdDB(id: number, updateCustomer: CustomerEntity): Promise<CustomerEntity> {
    await this.customerRepo.update(id, updateCustomer);
    return this.customerRepo.findOneBy({ id: id });
  }

  async deleteCustomer(id: number): Promise<string> {
    await this.customerRepo.delete(id);
    return `Customer with ID ${id} deleted successfully`; 
  }

    
    updateCustomer(myobj:object, id: number): object{
    return {message: "update customerid: "+id, body:myobj}
    }
}

//Newer code here

