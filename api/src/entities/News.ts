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

  @ManyToOne(() => Residence, r => r.news, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;

  @ManyToOne(() => Member, m => m.news, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'member_number' })
  author: Member;

}
