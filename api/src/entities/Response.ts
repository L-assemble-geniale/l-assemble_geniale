import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Residence } from './Residence';
import { Question } from './Question';

@Entity('t_response')
export class Response {
  @PrimaryGeneratedColumn({ name: 'vote_number' })
  id: number;

  @Column({ name: 'response_text', length: 100 })
  text: string;

  @Column({ name: 'number_of_vote', type: 'int', default: 0 })
  voteCount: number;

  @ManyToOne(() => Residence)
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;

  @ManyToOne(() => Question, question => question.responses)
  @JoinColumn({ name: 'question_number' })
  question: Question;
}
