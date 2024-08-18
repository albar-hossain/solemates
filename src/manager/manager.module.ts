import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { ManagerEntity } from './entities/manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[ TypeOrmModule.forFeature ([ManagerEntity]),MailerModule.forRoot({
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
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
