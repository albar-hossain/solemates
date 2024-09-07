import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity'
import { CreateCustomerDto, LoginCustomerDTO, UpdateCustomerDTO, GetCustomerDTO } from './dto/cutomer.dto';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
// import { Manager } from "../manager/manager.entity";

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
    private mailerService: MailerService
  ) { }
  
  async addCustomer(myobj: CustomerEntity): Promise<CustomerEntity> {
    return await this.customerRepo.save(myobj);
}
async findOne(logindata: LoginCustomerDTO): Promise<any> {
    return await this.customerRepo.findOneBy({ email: logindata.email });
}

async getIndex(): Promise<CustomerEntity[]> {
  return this.customerRepo.find();
  }
  

  async getCustomerByEmail(email: string): Promise<CustomerEntity> {
    return this.customerRepo.findOneBy({ email: email });
}
async getCustomerByID(id) {
    const data=await this.customerRepo.findOneBy({ id });
    console.log(data);
    if(data!==null) {
        return data;
    }
    else 
    {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

  }
  

    async updateCustomer(email: string, data: UpdateCustomerDTO): Promise<CustomerEntity> {
      await this.customerRepo.update({ email: email }, data);
      return this.customerRepo.findOneBy({ id: data.id });
      
  }

    async updateCustomerById(id: number, data: UpdateCustomerDTO): Promise<CustomerEntity> {
      await this.customerRepo.update(id, data);
      return this.customerRepo.findOneBy({ id });  
  }

  deleteCustomerByID(id):any {
    return this.customerRepo.delete(id);
  }

  async deleteCustomer(id: number): Promise<CustomerEntity[]> {
      await this.customerRepo.delete(id);
    return this.customerRepo.find();
    //  return `Customer with ID ${id} deleted successfully`; 
  }

  //new Code from here

  async signup(data: CreateCustomerDto): Promise<CustomerEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.customerRepo.save(data);
  }
  
  async signin(mydto:LoginCustomerDTO):Promise<boolean>{
    if (mydto.email != null && mydto.password != null) {
        const mydata = await this.customerRepo.findOneBy({ email: mydto.email });
        const isMatch = await bcrypt.compare(mydto.password, mydata.password);
        if (isMatch) {
            return true;
        }
        else {
            return false;
        }
    } else {
        return false;
    }
  }
  
  //auth code here
  async register(customerObject: CreateCustomerDto): Promise<GetCustomerDTO> {
    const { password, ...response } =
      await this.customerRepo.save(customerObject);
    return response;
  }

  async login(loginData: LoginCustomerDTO): Promise<any> {
    return await this.customerRepo.findOneBy({ email: loginData.email });
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

  getCustomerById(id: number): object{
    return {message: "Customer id:  "+id };
    }
    getCustomerByNameAndId(name: string, id: number): object{
    return {message: "Customer name: "+name+" id:"+ id};
    }
    getCustomer(myobj:object): object{
    return myobj;
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

  // async deleteCustomer(id: number): Promise<string> {
  //   await this.customerRepo.delete(id);
  //   return `Customer with ID ${id} deleted successfully`; 
  // }

    
    // updateCustomer(myobj:object, id: number): object{
    // return {message: "update customerid: "+id, body:myobj}
    // }
    async addAdmin(myobj: CustomerEntity): Promise<CustomerEntity> {
      return await this.customerRepo.save(myobj);
  }
}

