import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Res, Query, Put, DefaultValuePipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Session, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { ManagerDTO, ManagerLoginDTO, ManagerUpdateDTO } from './dto/manager.dto';
import { ManagerEntity } from './entities/manager.entity';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}


    //Send mail
    @Get()
    sendMail(): void {
      return this.managerService.sendMail();
  }
  @Get('/index')
  getManagerall(): any {
    return this.managerService.getIndex();
  }

  @Get('/findmanager/:id')
  async getManagerByID(@Param('id', ParseIntPipe) id: number): Promise<ManagerEntity> {
    const res = await this.managerService.getManagerByID(id);
        if (res !== null) {
            return await this.managerService.getManagerByID(id);
        }
        else {
            throw new HttpException("Manager not found", HttpStatus.NOT_FOUND);
        }
  }


  @Post('insertmanager')
  
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  }))
  insertManager(@Body() mydto:ManagerDTO,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 160000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filenames = file.filename;  
  return this.managerService.addManager(mydto);
  }

  

  @Put('/updatemanager/:id')
    @UsePipes(new ValidationPipe())
    updateManagerbyID(@Param('id') id: number, @Body() data:ManagerUpdateDTO ): object {
        return this.managerService.updateManagerById(id, data);
    }
    


  @Delete('/deletemanager/:id')
  deleteManagerbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.managerService.deleteManagerByID(id);
  }

  
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }
    
  @Get('get/:id')
  getManagerById(@Param('id', ParseIntPipe) id: number): object {
    console.log(typeof (id));
    return this.managerService.getManagerById(id);
  }

  @Get('get/bynameandid')
  getManagerByNameAndId(@Query('name') name: string, @Query('id') id: number): object {
    return this.managerService.getManagerByNameAndId(name, id);
  }

  @Get('getmanager')
  getManager(@Body() myobj:object): object {
    console.log(myobj);
return this.managerService.getManager(myobj);
  }

  // @Put('updatemanager/:id')
  // updateManager(@Body() myobj:ManagerUpdateDTO, @Param('id') id:number): object {
  //   return this.managerService.updateManager(myobj,id)
  // }

  //Database part

  @Get('getAllManager')
  getAllManager(): Promise<ManagerEntity[]> {
    return this.managerService.getAllManager();
  }

  @Post('addmanager')
  @UsePipes(new ValidationPipe())
  addManager(@Body() myobj:ManagerDTO): object {
    // console.log(myobj);
    return this.managerService.addManager(myobj);
  }


  @Get('getManagerByIdDB/:id')
  getManagerByIdDB(@Param('id', ParseIntPipe) id: number): Promise<ManagerEntity>
  {
    return this.managerService.getManagerByIdDB(id);
  }



  
@Put('updateManagerDB/:id')
    async updateManagerByIdDB(@Param('id') id: number, @Body() updateManagerDB: ManagerEntity): Promise<ManagerEntity> {
    return this.managerService.updateManagerByIdDB(id, updateManagerDB);
  }

    
  @Delete('deleteManager/:id')
  async deleteManager(@Param('id') id: number): Promise<string> {
    await this.managerService.deleteManager(id);
    return `Manager with ID ${id} has been successfully deleted.`;
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
signup(@Body() mydto:ManagerDTO,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 16000000}),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filenames = file.filename;  

return this.managerService.signup(mydto);

}

@Post('/signin')
@UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:ManagerLoginDTO)
{
  const res = await (this.managerService.signin(mydto));
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
