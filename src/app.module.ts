import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerModule } from './manager2/manager.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './warehouse/auth/auth.module';
import { WarehouseModule } from './warehouse/warehouse.module';

@Module({ 
  imports: [CustomerModule, TypeOrmModule.forRoot(
    { type: 'postgres', host: 'localhost', port: 5432,
    username: 'postgres',
      password: 'root',
      database: 'solemate',   
    autoLoadEntities: true,
      synchronize: true,
    }  )
    ,AuthModule,ManagerModule,WarehouseModule,OrderModule, ProductModule],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
