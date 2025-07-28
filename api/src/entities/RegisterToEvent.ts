import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Residence } from './Residence';
import { Member } from './Member';
import { Event } from './Event';

@Entity('register')
export class RegisterToEvent {
  @PrimaryColumn({ name: 'residence_number' })
  residenceNumber: number;

  @PrimaryColumn({ name: 'member_number' })
  memberNumber: number;

  @PrimaryColumn({ name: 'event_number' })
  eventNumber: number;

  @ManyToOne(() => Residence)
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'member_number' })
  member: Member;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_number' })
  event: Event;
}
