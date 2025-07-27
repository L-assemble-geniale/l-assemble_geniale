import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Residence } from './Residence';
import { Response } from './Response';

@Entity('t_question')
export class Question {
  @PrimaryGeneratedColumn({ name: 'question_number' })
  id: number;

  @Column({ length: 300 })
  question: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Residence)
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;

  @OneToMany(() => Response, (response) => response.question)
  responses: Response[];
}