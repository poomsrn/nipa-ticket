import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { Tickets } from '../../entities/tickets.entity';
import { CreateTicketDto, UpdateTicketDto } from '../dto/ticket.dto';
import { BadRequestException } from '../exceptions/badRequest.exception';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Tickets)
    private readonly ticketRepository: Repository<Tickets>,
  ) {}

  async GetAllTickets(sort: string, filter: string): Promise<Tickets[]> {
    try {
      const options: FindManyOptions<Tickets> = {};

      if (filter) {
        const statusArray = filter.split(',');
        options.where = { status: In(statusArray) };
      }

      if (sort === 'status') {
        options.order = { status: 'ASC' };
      } else if (sort === 'oldestCreated') {
        options.order = { createdAt: 'ASC' };
      } else if (sort === 'latestCreated') {
        options.order = { createdAt: 'DESC' };
      } else if (sort === 'oldestUpdated') {
        options.order = { updatedAt: 'ASC' };
      } else if (sort === 'latestUpdate') {
        options.order = { updatedAt: 'DESC' };
      } else {
        options.order = { updatedAt: 'DESC' };
      }

      return await this.ticketRepository.find(options);
    } catch (error) {
      throw error;
    }
  }

  async GetTicket(id: number): Promise<Tickets> {
    try {
      const ticket = await this.ticketRepository.findOne({
        where: { id },
      });
      if (!ticket) {
        throw new BadRequestException('ticket not found');
      }
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async CreateTicket(data: CreateTicketDto): Promise<Tickets> {
    try {
      return await this.ticketRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async UpdateTicket(data: UpdateTicketDto): Promise<Tickets> {
    try {
      const { id } = data;
      await this.GetTicket(id);
      await this.ticketRepository.update({ id }, data);
      return await this.ticketRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
