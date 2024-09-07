import { Injectable } from '@nestjs/common';
import { CreateOrderDTO, UpdateOrderDto } from './dto/order.dto';
import { OrderEntity } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  // async create(createOrderDto: CreateOrderDTO): Promise<Object> {
  //   return await this.orderRepository.save(createOrderDto);
  // }

  // async findAll(): Promise<Object[]> {
  //   return await this.orderRepository.find({ relations: ['course'] });
  // }

  // async findOne(id: number): Promise<OrderEntity> {
  //   return await this.orderRepository.findOneBy({ id: id });
  // }

  // async update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return await this.orderRepository.save({id, updateOrderDto});
  // }

  // async remove(id: number) : Promise<Object>{
  //   return await this.orderRepository.delete({ id: id });
  // }
}
