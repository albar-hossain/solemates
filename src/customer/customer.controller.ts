import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, Query, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { CustomerDTO, CustomerUpdateDTO } from './dto/cutomer.dto';
import { CustomerProfile } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CustomerDTO) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: CustomerDTO) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  //New Code from here

  @Get('get/:id')
  getCustomerById(@Param('id', ParseIntPipe) id: number): object {
    console.log(typeof (id));
    return this.customerService.getCustomerById(id);
  }

  @Get('getbynameandid')
  getCustomerByNameAndId(@Query('name') name: string, @Query('id') id: number): object {
    return this.customerService.getCustomerByNameAndId(name, id);
  }

  @Get('getcustomer')
  getCustomer(@Body() myobj:object): object {
    console.log(myobj);
return this.customerService.getCustomer(myobj);
  }

  @Put('updatecustomer/:id')
  updateCustomer(@Body() myobj:CustomerUpdateDTO, @Param('id') id:number): object {
    return this.customerService.updateCustomer(myobj,id)
  }

  //Database part

  @Get('getAllCustomer')
  getAllCustomer(): Promise<CustomerProfile[]> {
    return this.customerService.getAllCustomer();
  }

  @Post('addcustomer')
  @UsePipes(new ValidationPipe())
  addCustomer(@Body() myobj:CustomerDTO): object {
    console.log(myobj);
    return this.customerService.addCustomer(myobj);
  }

  @Get('getCustomerByIdDB/:id')
  getCustomerByIdDB(@Param('id', ParseIntPipe) id: number): Promise<CustomerProfile>
  {
    return this.customerService.getCustomerByIdDB(id);
  }

  
@Put('updateCustomerDB/:id')
    async updateCustomerByIdDB(@Param('id') id: number, @Body() updateCustomerDB: CustomerProfile): Promise<CustomerProfile> {
    return this.customerService.updateCustomerByIdDB(id, updateCustomerDB);
  }

    
  @Delete('deleteCustomer/:id')
  async deleteCustomer(@Param('id') id: number): Promise<string> {
    return this.customerService.deleteCustomer(id);
  }


@Post('addimage')
@UseInterceptors(FileInterceptor('myfile',
  { fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 30000 },
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




}
