import { Column, DeleteDateColumn, Entity } from 'typeorm';

import { IsEnum, IsNotEmpty } from 'class-validator';

export enum EventTypes {
  MOBILE = 'MOBILE',
  WEB = 'WEB',
  SERVER = 'SERVER',
}

@Entity({
  name: 'events',
})
export class Events {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'start_date' })
  startDate: Date;

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
}
