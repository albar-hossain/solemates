import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerProfile } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ TypeOrmModule.forFeature ([CustomerProfile]),],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
