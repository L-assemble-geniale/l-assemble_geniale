import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Member } from './Member';
import { News } from './News';
import { Invitation } from './Invitation';
import { Adress } from './Adress';

@Entity('t_residence')
export class Residence {
  @PrimaryGeneratedColumn({ name: 'residence_number' })
  id: number;

  @Column({ name: 'residence_name', length: 300 })
  name: string;

  @OneToMany(() => Member, member => member.residence)
  members: Member[];

  @OneToMany(() => Invitation, invitation => invitation.residence)
  invitations: Invitation[];

  @OneToMany(() => News, news => news.residence)
  news: News[];

  @OneToMany(() => Adress, (adress) => adress.residence, {
    cascade: true,
    eager: true,
  })
  adresses: Adress[];


}