import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Residence } from './Residence';
import { News } from './News';

@Entity('t_member')
export class Member {
  @PrimaryGeneratedColumn({ name: 'member_number' })
  id: number;

  @Column({ name: 'last_name', length: 100, nullable: false })
  lastName: string;

  @Column({ name: 'first_name', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ length: 320, unique: true, nullable: false })
  email: string;

  @Column({ name: 'phone_number', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ name: 'appartment_number', length: 10, nullable: true })
  appartmentNumber: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @ManyToOne(() => Residence, residence => residence.members)
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;

  @OneToMany(() => News, news => news.author)
  news: News[];
}