import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Residence } from './Residence';
import { Adress } from './Adress';
import { RegisterToEvent } from './RegisterToEvent';

@Entity('t_events')
export class Event {
  @PrimaryGeneratedColumn({ name: 'event_number' })
  id: number;

  @Column({ name: 'event_title', length: 255 })
  title: string;

  @Column({ name: 'event_date', type: 'timestamp', nullable: true })
  date: Date;

  @Column({ length: 1000, nullable: true })
  description: string;

  @ManyToOne(() => Adress)
  @JoinColumn({ name: 'adress_number' })
  adress: Adress;

  @ManyToOne(() => Residence)
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;

  @OneToMany(() => RegisterToEvent, register => register.event)
  registrations: RegisterToEvent[];
}
