import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tickets } from '../../entities/tickets.entity';
import { TicketController } from '../controllers/ticket.controller';
import { TicketService } from '../services/ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tickets])],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
