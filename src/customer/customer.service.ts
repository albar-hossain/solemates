import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerProfile } from './entities/customer.entity'
import { CustomerDTO } from './dto/cutomer.dto';
import { Repository } from 'typeorm';
// import { Manager } from "../manager/manager.entity";

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(CustomerProfile)  private customerRepo: Repository<CustomerProfile>,
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
    addCustomer(myobj:CustomerDTO): Promise<CustomerProfile>{
    return this.customerRepo.save(myobj);
  }
  //Show all customer from DB NOT WORKING
  getAllCustomer(): Promise<CustomerProfile[]> {
    return this.customerRepo.find();
  }

  getCustomerByIdDB(id: number): Promise<CustomerProfile> {
    return this.customerRepo.findOneBy({ id: id });
  }

  async updateCustomerByIdDB(id: number, updateCustomer: CustomerProfile): Promise<CustomerProfile> {
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
