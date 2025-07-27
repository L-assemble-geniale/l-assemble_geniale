import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from './Category';
import { Adress } from './Adress';
import { Residence } from './Residence';

@Entity('t_recomandation')
export class Recommandation {
  @PrimaryGeneratedColumn({ name: 'recomandation_number' })
  id: number;

  @Column({ name: 'recomandation_name', length: 200 })
  name: string;

  @Column({ length: 1000, nullable: true })
  description: string;

  @Column({ name: 'phone_number', length: 20, nullable: true })
  phoneNumber: string;

  @Column({ length: 320 })
  email: string;

  @ManyToOne(() => Category, category => category.recommandations)
  @JoinColumn({ name: 'category_number' })
  category: Category;

  @ManyToOne(() => Adress)
  @JoinColumn({ name: 'adress_number' })
  adress: Adress;

  @ManyToOne(() => Residence)
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;
}
