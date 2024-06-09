import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Moderator } from '../moderator/moderator.entity';

export enum EventTypes {
  MOBILE = 'MOBILE',
  WEB = 'WEB',
  SERVER = 'SERVER',
}

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ name: 'name' })
  name: string;

  @IsNotEmpty()
  @Column({ name: 'code' })
  code: string;

  @IsNotEmpty()
  @Column({ name: 'start_date' })
  startDate: Date;

  @IsNotEmpty()
  @Column({ name: 'estimated_invitee_nbr' })
  estimatedInviteeNbr: string;

  @IsEnum(EventTypes)
  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: EventTypes,
    name: 'event_type',
  })
  eventType: EventTypes;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    precision: 6,
  })
  originalTimestamp: Date;

  @OneToMany(() => Moderator, moderator => moderator.event)
  moderators: Moderator[];
}
