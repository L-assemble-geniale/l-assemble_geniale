import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Residence } from './Residence';
import { Member } from './Member';

@Entity('t_news')
export class News {
  @PrimaryGeneratedColumn({ name: 'news_number' })
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 2000 })
  text: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Residence, residence => residence.news)
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;

  @ManyToOne(() => Member, member => member.news)
  @JoinColumn({ name: 'member_number' })
  author: Member;
}
