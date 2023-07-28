import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TicketStatus } from '../constants/ticket.constant';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Blackpink',
    description: 'title',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Concert',
    description: 'description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'FB: BlackpinkTH',
    description: 'contact information',
  })
  contactInformation: string;
}

export class UpdateTicketDto extends CreateTicketDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'id of the ticket',
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: TicketStatus.Accepted,
    description: 'Status of the ticket',
    enum: TicketStatus,
  })
  status: string;
}

export class TicketDto {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  id: number;

  @ApiProperty({
    example: 'Blackpink',
    description: 'title',
  })
  title: string;

  @ApiProperty({
    example: 'Concert',
    description: 'description',
  })
  description: string;

  @ApiProperty({
    example: 'FB: BlackpinkTH',
    description: 'contact information',
  })
  contactInformation: string;

  @ApiProperty({
    example: TicketStatus.Accepted,
    description: 'Status of the ticket',
    enum: TicketStatus,
  })
  status: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'created at',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'updated at',
  })
  updatedAt: Date;
}
