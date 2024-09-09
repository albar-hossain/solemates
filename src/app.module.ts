import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './Customer/customer.module';
//import { User2Module } from './user2/user2.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Customer/Auth/auth.module';

@Module({
  imports: [CustomerModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'solemate',
      autoLoadEntities: true,
      synchronize: true,
    }
  ), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
