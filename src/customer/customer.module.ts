import { Module } from "@nestjs/common";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { CustomerEntity } from "../Customer/entities/customer.entity";
import { AuthService } from "./Auth/auth.service";
import { MailerModule } from '@nestjs-modules/mailer';
import { OrderEntity } from "./entities/order.entity";
import { ProductEntity } from "./entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CustomerEntity, OrderEntity,ProductEntity]),
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
            user: 'solemates.bd.2024@gmail.com',
            pass: 'adfzrukqegtwdsxu',
          },
        },
      }),
    JwtModule.register({
        global: true,
        secret: "3NP_Backend_Customer",
        signOptions: { expiresIn: '30m' },
    }),
    ],
    controllers: [CustomerController],
    providers: [CustomerService, AuthService],
    exports: [CustomerService],
})

export class CustomerModule { }