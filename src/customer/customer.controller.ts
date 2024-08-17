import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, Query, Put, DefaultValuePipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Session, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { CustomerDTO, CustomerLoginDTO, CustomerUpdateDTO } from './dto/cutomer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}


    //Send mail
    @Get()
    sendMail(): void {
      return this.customerService.sendMail();
  }
  @Get('/index')
  getCustomerall(): any {
    return this.customerService.getIndex();
  }

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


  @Post('insertcustomer')
  
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  }))
  insertCustomer(@Body() mydto:CustomerDTO,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 160000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filenames = file.filename;  
  return this.customerService.addCustomer(mydto);
  }

  

  @Put('/updatecustomer/:id')
    @UsePipes(new ValidationPipe())
    updateCustomerbyID(@Param('id') id: number, @Body() data:CustomerUpdateDTO ): object {
        return this.customerService.updateCustomerById(id, data);
    }
    


  @Delete('/deletecustomer/:id')
  deleteCustomerbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.customerService.deleteCustomerByID(id);
  }

  
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }
    
  
  // @Post()
  // create(@Body() createCustomerDto: CustomerDTO) {
  //   return this.customerService.create(createCustomerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.customerService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.customerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCustomerDto: CustomerDTO) {
  //   return this.customerService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.customerService.remove(+id);
  // }

  //New Code from here


  

  @Get('get/:id')
  getCustomerById(@Param('id', ParseIntPipe) id: number): object {
    console.log(typeof (id));
    return this.customerService.getCustomerById(id);
  }

  @Get('get/bynameandid')
  getCustomerByNameAndId(@Query('name') name: string, @Query('id') id: number): object {
    return this.customerService.getCustomerByNameAndId(name, id);
  }

  @Get('getcustomer')
  getCustomer(@Body() myobj:object): object {
    console.log(myobj);
return this.customerService.getCustomer(myobj);
  }

  // @Put('updatecustomer/:id')
  // updateCustomer(@Body() myobj:CustomerUpdateDTO, @Param('id') id:number): object {
  //   return this.customerService.updateCustomer(myobj,id)
  // }

  //Database part

  @Get('getAllCustomer')
  getAllCustomer(): Promise<CustomerEntity[]> {
    return this.customerService.getAllCustomer();
  }

  @Post('addcustomer')
  @UsePipes(new ValidationPipe())
  addCustomer(@Body() myobj:CustomerDTO): object {
    // console.log(myobj);
    return this.customerService.addCustomer(myobj);
  }


  @Get('getCustomerByIdDB/:id')
  getCustomerByIdDB(@Param('id', ParseIntPipe) id: number): Promise<CustomerEntity>
  {
    return this.customerService.getCustomerByIdDB(id);
  }



  
@Put('updateCustomerDB/:id')
    async updateCustomerByIdDB(@Param('id') id: number, @Body() updateCustomerDB: CustomerEntity): Promise<CustomerEntity> {
    return this.customerService.updateCustomerByIdDB(id, updateCustomerDB);
  }

    
  @Delete('deleteCustomer/:id')
  async deleteCustomer(@Param('id') id: number): Promise<string> {
    await this.customerService.deleteCustomer(id);
    return `Customer with ID ${id} has been successfully deleted.`;
  }



@Post('addimage')
@UseInterceptors(FileInterceptor('myimage',
  { fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 160000000 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }
)
)
addImage(@Body() myobj:object,@UploadedFile() file: Express.Multer.File) {
console.log(file);
console.log(myobj);
return myobj;
}

@Get('/getimage/:name')
getImage(@Param('name') filename:string, @Res() res) {
res.sendFile(filename,{ root: './uploads' })
}


  //Newer code here
  
  @Post('/signup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:CustomerDTO,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 16000000}),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filenames = file.filename;  

return this.customerService.signup(mydto);

}

@Post('/signin')
@UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:CustomerLoginDTO)
{
  const res = await (this.customerService.signin(mydto));
if(res==true)
{
session.email = mydto.email;
return (session.email);
}
else
{
throw new UnauthorizedException({ message: "invalid credentials" });
}
  }

  @Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}
  

  
  
}
