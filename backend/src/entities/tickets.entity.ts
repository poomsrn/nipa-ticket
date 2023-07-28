import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketStatus } from '../common/constants/ticket.constant';

@Entity()
export class Tickets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  title: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'contact_information', nullable: false })
  contactInformation: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.Pending,
  })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
