import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerService } from '../customer.service';
import { CustomerDTO, loginDTO } from '../dto/customer.dto';
import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class AuthService {
    constructor(
        private customerService: CustomerService,
        private jwtService: JwtService
    ) { }
    async signUp(myobj: CustomerDTO): Promise<CustomerDTO> {
        return await this.customerService.addCustomer(myobj);
    }

    async signIn(logindata: loginDTO): Promise<{ access_token: string }> {
        const user = await this.customerService.findOne(logindata);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(logindata.password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const payload = logindata;
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}