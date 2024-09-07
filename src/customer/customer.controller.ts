import { Body, Controller, Delete, Get, HttpException, HttpStatus, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, Req, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { AuthGuard } from "./Auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { CustomerDTO, UpdateCustomerDTO } from "../Customer/dto/customer.dto";
import { CustomerEntity } from "../Customer/entities/customer.entity";
import { SessionGuard } from "./session.guard";


@Controller('customer')
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {}

    //Send mail
    //1
    @UseGuards(SessionGuard)
    @Get('/email')
    sendMail(): void {
    return this.customerService.sendMail();
    }

    //2
    @UseGuards(SessionGuard)
    @Get('/dashboard')
    getcustomer(): object {
        try {
            return this.customerService.getAllCustomer();
        }
        catch {
            return { error: 'invalid' };
        }
    }

    //3
    @UseGuards(SessionGuard)
    @Get('/viewprofile')
    showProfile(@Session() session): object {
        try {
            return this.customerService.showProfile(session.username);
        }
        catch {
            throw new InternalServerErrorException("Failed to show profile");
        }
    }

    //4
    @UseGuards(SessionGuard)
    @Put('/update/:id')
    updateUsersById(@Param('id') id: number): object {
        try {
            return this.customerService.remove(id);
        } catch {
            throw new InternalServerErrorException("Failed to update profile");
        }
    }

    //5
    @UseGuards(SessionGuard)
    @Get('/findcustomer/:id')
    async getCustomerByID(@Param('id', ParseIntPipe) id: number): Promise<CustomerEntity> {
      const res = await this.customerService.getCustomerByID(id);
          if (res !== null) {
              return await this.customerService.getCustomerByID(id);
          }
          else {
              throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
          }
    }

    //6
    @Put('/updatecustomer/:id')
    @UsePipes(new ValidationPipe())
    updateCustomerbyID(@Param('id') id: string, @Body() data:UpdateCustomerDTO ): object {
        return this.customerService.updateCustomerById(id, data);
    }

    //5
    @UseGuards(SessionGuard)
    @Delete('/delete/:id')
    deleteUserbyId(@Param('id') id: number): object {
        try {
            return this.customerService.remove(id);

        } catch {
            throw new InternalServerErrorException("Failed to delete profile");
        }
    }


    //6
    @UseGuards(SessionGuard)
    @Get('/order')
    getOrderByNameAndId(@Query('name') name: string, @Query('id') id: string): object {
        try {
            return this.customerService.getOrderByNameAndId(name, id);

        } catch {
            throw new InternalServerErrorException("Failed to show order");
        }
    }

    //7
    @UseGuards(SessionGuard)
    @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './upload' })
    }


    //8
    @UseGuards(SessionGuard)
    @Get('fullname/:substring')
    async getUserBySubString(@Param('substring') substring: string): Promise<CustomerEntity[]> {
        

        try {
            return this.customerService.findByFullName(substring);

        } catch {
            throw new InternalServerErrorException("Customer name does not exist.");
        }
    }

    //9
    @UseGuards(SessionGuard)
    @Get('usernames/:usernames')
    async getUserByUsername(@Param('username') username: string): Promise<CustomerEntity> {
        return this.customerService.findOneByUsername(username);
    }

};