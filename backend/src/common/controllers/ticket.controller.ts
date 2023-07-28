import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TicketStatus } from '../constants/ticket.constant';
import { CreateTicketDto, TicketDto, UpdateTicketDto } from '../dto/ticket.dto';
import { BadRequestException } from '../exceptions/badRequest.exception';
import { ValidationPipe } from '../pipes/validation.pipe';
import { TicketService } from '../services/ticket.service';

@ApiTags('Tickets')
@Controller('ticket')
@ApiResponse({
  status: 400,
  description: 'Return bad request',
})
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({
    status: 200,
    description: 'Return all tickets',
    type: [TicketDto],
  })
  @ApiQuery({
    name: 'sort',
    description: 'Sort tickets',
    enum: [
      'lastestCreated',
      'oldestCreated',
      'latestUpdated',
      'oldestUpdated',
      'status',
    ],
    required: false,
  })
  @ApiQuery({
    name: 'filter',
    description: 'Filter tickets',
    enum: TicketStatus,
    required: false,
  })
  @Get()
  async getAllTickets(
    @Query('sort') sort: string,
    @Query('filter') filter: string,
  ) {
    return this.ticketService.GetAllTickets(sort, filter);
  }

  @ApiOperation({ summary: 'Get ticket' })
  @ApiResponse({ status: 200, description: 'Return ticket', type: TicketDto })
  @ApiParam({
    name: 'id',
    description: 'Ticket ID',
    required: true,
  })
  @Get(':id')
  async getTicket(@Param('id') id: string) {
    try {
      if (isNaN(+id)) throw new BadRequestException('id must be a number');
      return this.ticketService.GetTicket(+id);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({
    summary: 'Create ticket',
  })
  @ApiResponse({
    status: 201,
    description: 'return ticket',
    type: TicketDto,
  })
  @ApiBody({
    type: CreateTicketDto,
  })
  @Post('create')
  async createTicket(@Body(new ValidationPipe()) data: CreateTicketDto) {
    return await this.ticketService.CreateTicket(data);
  }

  @ApiOperation({
    summary: 'Update ticket',
  })
  @ApiResponse({
    status: 200,
    description: 'return ticket',
    type: TicketDto,
  })
  @ApiBody({
    type: UpdateTicketDto,
  })
  @Patch('update')
  async updateTicket(@Body() data: UpdateTicketDto) {
    return await this.ticketService.UpdateTicket(data);
  }
}
