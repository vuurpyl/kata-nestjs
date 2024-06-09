import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Events } from '../events/events.entity';

@Entity('moderators')
export class Moderator {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  firstname: string;

  @IsNotEmpty()
  @Column()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @Column()
  email: string;

  @IsPhoneNumber("TN")
  @IsNotEmpty()
  @Column()
  phone: string;

  @ManyToOne(() => Events, event => event.moderators)
  event: Events;
}
