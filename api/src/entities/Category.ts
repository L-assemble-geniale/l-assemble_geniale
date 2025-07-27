import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recommandation } from './Recommandation';

@Entity('t_category')
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_number' })
  id: number;

  @Column({ name: 'category_name', length: 255 })
  name: string;

  @OneToMany(() => Recommandation, r => r.category)
  recommandations: Recommandation[];
}
