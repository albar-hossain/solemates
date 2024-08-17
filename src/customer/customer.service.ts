import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity'
import { CustomerDTO, CustomerLoginDTO, CustomerUpdateDTO } from './dto/cutomer.dto';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { CustomerProfile } from './entities/customerprofile.entity';
// import { Manager } from "../manager/manager.entity";

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
    @InjectRepository(CustomerProfile) private customerprofileRepo:Repository<CustomerProfile>,
    private mailerService: MailerService
    // @InjectRepository(Manager)  private managerRepo: Repository<Manager>
){}

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
  
async getCustomerbyIDAndName(id, name): Promise<CustomerEntity> {
    return this.customerRepo.findOneBy({ id: id, fullname: name });
  }
  
  async addCustomer(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password= hassedpassed;
    return this.customerRepo.save(mydto);
    }

    async createCustomer(user: CustomerEntity, userProfile: CustomerProfile): Promise<CustomerEntity> {
      userProfile.CustomerEntity = user;
      await this.customerprofileRepo.save(userProfile);
      return this.customerprofileRepo.save(user);
      }

    async updateCustomer(email: string, data: CustomerUpdateDTO): Promise<CustomerEntity> {
      await this.customerRepo.update({ email: email }, data);
      return this.customerRepo.findOneBy({ id: data.id });
      
  }

    async updateCustomerById(id: number, data: CustomerUpdateDTO): Promise<CustomerEntity> {
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

    async getimagebycustomerid(customerid: number): Promise<string> {
    const mydata: CustomerDTO = await this.customerRepo.findOneBy({ id: customerid });
    console.log(mydata);
    return mydata.filenames;
}
  //new Code from here

  async signup(data: CustomerDTO): Promise<CustomerEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.customerRepo.save(data);
  }
  
  async signin(mydto:CustomerLoginDTO):Promise<boolean>{
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
}

