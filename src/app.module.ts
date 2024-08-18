import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [CustomerModule,ManagerModule, TypeOrmModule.forRoot(
    { type: 'postgres', host: 'localhost', port: 5432,
    username: 'postgres',
      password: 'root',
      database: 'solemate',   
    autoLoadEntities: true,
      synchronize: true,
    }  ),
    ],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
