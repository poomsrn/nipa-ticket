import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tickets } from '../../entities/tickets.entity';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;

  const mockTicketRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketService,
        {
          provide: getRepositoryToken(Tickets),
          useValue: mockTicketRepository,
        },
      ],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GetAllTickets', () => {
    it('should return an array of tickets', async () => {
      const expectedTickets = [
        { id: 1, title: 'Ticket 1', description: 'Description 1' },
        { id: 2, title: 'Ticket 2', description: 'Description 2' },
      ];
      mockTicketRepository.find.mockResolvedValue(expectedTickets);

      const sort = 'latestUpdate';
      const filter = 'pending,accepted';

      const result = await service.GetAllTickets(sort, filter);

      expect(result).toEqual(expectedTickets);
    });
  });

  describe('GetTicket', () => {
    it('should return a ticket with the given id', async () => {
      const ticketId = 1;
      const expectedTicket = {
        id: ticketId,
        title: 'Ticket 1',
        description: 'Description 1',
      };
      mockTicketRepository.findOne.mockResolvedValue(expectedTicket);

      const result = await service.GetTicket(ticketId);

      expect(result).toEqual(expectedTicket);
      expect(mockTicketRepository.findOne).toHaveBeenCalledWith({
        where: { id: ticketId },
      });
    });

    it('should throw an error if the ticket is not found', async () => {
      const ticketId = 100;
      mockTicketRepository.findOne.mockResolvedValue(null);

      await expect(service.GetTicket(ticketId)).rejects.toThrowError(
        'ticket not found',
      );
      expect(mockTicketRepository.findOne).toHaveBeenCalledWith({
        where: { id: ticketId },
      });
    });
  });

  describe('CreateTicket', () => {
    it('should create and return a new ticket', async () => {
      const createTicketDto = {
        title: 'New Ticket',
        description: 'New Description',
        contactInformation: 'New Contact Information',
      };
      const createdTicket = { id: 1, ...createTicketDto };
      mockTicketRepository.save.mockResolvedValue(createdTicket);

      const result = await service.CreateTicket(createTicketDto);

      expect(result).toEqual(createdTicket);
      expect(mockTicketRepository.save).toHaveBeenCalledWith(createTicketDto);
    });
  });

  describe('UpdateTicket', () => {
    it('should update and return the updated ticket', async () => {
      const ticketId = 1;
      const updateTicketDto = {
        id: ticketId,
        title: 'Updated Ticket',
        description: 'Updated Description',
        contactInformation: 'Updated Information',
        status: 'accepted',
      };
      const updatedTicket = { ...updateTicketDto };
      mockTicketRepository.findOne.mockResolvedValue(updatedTicket);
      mockTicketRepository.update.mockResolvedValue(undefined);

      const result = await service.UpdateTicket(updateTicketDto);

      expect(result).toEqual(updatedTicket);
      expect(mockTicketRepository.findOne).toHaveBeenCalledWith({
        where: { id: ticketId },
      });
      expect(mockTicketRepository.update).toHaveBeenCalledWith(
        { id: ticketId },
        updateTicketDto,
      );
    });

    it('should throw an error if the ticket is not found', async () => {
      const updateTicketDto = {
        id: 100,
        title: 'Updated Ticket',
        description: 'Updated Description',
        contactInformation: 'Updated Information',
        status: 'accepted',
      };
      mockTicketRepository.findOne.mockResolvedValue(null);

      await expect(service.UpdateTicket(updateTicketDto)).rejects.toThrowError(
        'ticket not found',
      );
      expect(mockTicketRepository.findOne).toHaveBeenCalledWith({
        where: { id: 100 },
      });
    });
  });
});
