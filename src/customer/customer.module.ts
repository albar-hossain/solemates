import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerEntity } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomerProfile } from './entities/customerprofile.entity';

@Module({
  imports:[ TypeOrmModule.forFeature ([CustomerEntity,CustomerProfile]),MailerModule.forRoot({
    transport: {
    host: 'smtp.gmail.com',
    port: 465,
    ignoreTLS: true,
    secure: true,
    auth: {
    user: 'solemates.bd.2024@gmail.com',
    pass: 'adfzrukqegtwdsxu'
    },
    }
    })],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
