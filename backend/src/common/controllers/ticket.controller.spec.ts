import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '../exceptions/badRequest.exception';
import { TicketService } from '../services/ticket.service';
import { TicketController } from './ticket.controller';

describe('TicketController', () => {
  let ticketController: TicketController;
  let ticketService: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [
        {
          provide: TicketService,
          useValue: {
            GetAllTickets: jest.fn(),
            GetTicket: jest.fn(),
            CreateTicket: jest.fn(),
            UpdateTicket: jest.fn(),
          },
        },
      ],
    }).compile();

    ticketController = module.get<TicketController>(TicketController);
    ticketService = module.get<TicketService>(TicketService);
  });

  describe('getAllTickets', () => {
    it('should call ticketService.GetAllTickets with correct parameters', async () => {
      const sort = 'latestUpdate';
      const filter = 'pending,accepted';

      await ticketController.getAllTickets(sort, filter);

      expect(ticketService.GetAllTickets).toHaveBeenCalledWith(sort, filter);
    });
  });

  describe('getTicket', () => {
    it('should call ticketService.GetTicket with correct parameter', async () => {
      const id = '1';

      await ticketController.getTicket(id);

      expect(ticketService.GetTicket).toHaveBeenCalledWith(1);
    });

    it('should throw BadRequestException if id is not a number', async () => {
      const id = 'abc';

      await expect(ticketController.getTicket(id)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('createTicket', () => {
    it('should call ticketService.CreateTicket with correct data', async () => {
      const createTicketDto = {
        title: 'Test Ticket',
        description: 'Test Description',
        contactInformation: 'test@example.com',
      };

      await ticketController.createTicket(createTicketDto);

      expect(ticketService.CreateTicket).toHaveBeenCalledWith(createTicketDto);
    });
  });

  describe('updateTicket', () => {
    it('should call ticketService.UpdateTicket with correct data', async () => {
      const updateTicketDto = {
        id: 1,
        title: 'Updated Ticket',
        description: 'Updated Description',
        contactInformation: 'updated@example.com',
        status: 'accepted',
      };

      await ticketController.updateTicket(updateTicketDto);

      expect(ticketService.UpdateTicket).toHaveBeenCalledWith(updateTicketDto);
    });
  });
});
