import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from './entities/manager.entity'
import { ManagerDTO, ManagerLoginDTO, ManagerUpdateDTO } from './dto/manager.dto';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
// import { Manager } from "../manager/manager.entity";

@Injectable()
export class ManagerService {

  constructor(
    @InjectRepository(ManagerEntity) private managerRepo: Repository<ManagerEntity>,
    private mailerService: MailerService
    // @InjectRepository(Manager)  private managerRepo: Repository<Manager>
){}

async getIndex(): Promise<ManagerEntity[]> {
  return this.managerRepo.find();
  }
  

  async getManagerByEmail(email: string): Promise<ManagerEntity> {
    return this.managerRepo.findOneBy({ email: email });
}
async getManagerByID(id) {
    const data=await this.managerRepo.findOneBy({ id });
    console.log(data);
    if(data!==null) {
        return data;
    }
    else 
    {
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

  }
  
async getManagerbyIDAndName(id, name): Promise<ManagerEntity> {
    return this.managerRepo.findOneBy({ id: id, fullname: name });
  }
  
  async addManager(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password= hassedpassed;
    return this.managerRepo.save(mydto);
    }


    async updateManager(email: string, data: ManagerUpdateDTO): Promise<ManagerEntity> {
      await this.managerRepo.update({ email: email }, data);
      return this.managerRepo.findOneBy({ id: data.id });
      
  }

    async updateManagerById(id: number, data: ManagerUpdateDTO): Promise<ManagerEntity> {
      await this.managerRepo.update(id, data);
      return this.managerRepo.findOneBy({ id });  
  }

  deleteManagerByID(id):any {
    return this.managerRepo.delete(id);
  }

  async deleteManager(id: number): Promise<ManagerEntity[]> {
      await this.managerRepo.delete(id);
    return this.managerRepo.find();
    //  return `Manager with ID ${id} deleted successfully`; 
  }

    async getimagebymanagerid(managerid: number): Promise<string> {
    const mydata: ManagerDTO = await this.managerRepo.findOneBy({ id: managerid });
    console.log(mydata);
    return mydata.filenames;
}
  //new Code from here

  async signup(data: ManagerDTO): Promise<ManagerEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return this.managerRepo.save(data);
  }
  
  async signin(mydto:ManagerLoginDTO):Promise<boolean>{
    if (mydto.email != null && mydto.password != null) {
        const mydata = await this.managerRepo.findOneBy({ email: mydto.email });
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
      to: 'meghsimit642@gmail.com', 
      from: 'solemates.bd.2024@gmail.com', 
      subject: 'Welcome to Bangladesh\'s premier sneaker marketplace',
      text: 'Welcome', 
      html: '<b>Welcome Manager, Thank You for joining us.</b>', 
    })
  }

  getManagerById(id: number): object{
    return {message: "Manager id:  "+id };
    }
    getManagerByNameAndId(name: string, id: number): object{
    return {message: "Manager name: "+name+" id:"+ id};
    }
    getManager(myobj:object): object{
    return myobj;
  }

  //Show all manager from DB NOT WORKING
  getAllManager(): Promise<ManagerEntity[]> {
    return this.managerRepo.find();
  }

  getManagerByIdDB(id: number): Promise<ManagerEntity> {
    return this.managerRepo.findOneBy({ id: id });
  }


  async updateManagerByIdDB(id: number, updateManager: ManagerEntity): Promise<ManagerEntity> {
    await this.managerRepo.update(id, updateManager);
    return this.managerRepo.findOneBy({ id: id });
  }

  // async deleteManager(id: number): Promise<string> {
  //   await this.managerRepo.delete(id);
  //   return `Manager with ID ${id} deleted successfully`; 
  // }

    
    // updateManager(myobj:object, id: number): object{
    // return {message: "update managerid: "+id, body:myobj}
    // }
}

