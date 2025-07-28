import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Residence } from './Residence';

@Entity('t_adress')
export class Adress {
  @PrimaryGeneratedColumn({ name: 'adress_number' })
  id: number;

  @Column({ name: 'street_number', length: 20 })
  streetNumber: string;

  @Column({ name: 'street_name', length: 300 })
  streetName: string;

  @Column({ name: 'city', length: 150 })
  city: string;

  @Column({ name: 'postal_code', length: 20 })
  postalCode: string;

  @ManyToOne(() => Residence, (residence) => residence.adresses)
  @JoinColumn({ name: "residence_number" })
  residence: Residence;
}
