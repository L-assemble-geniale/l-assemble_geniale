import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Residence } from './Residence';

@Entity('t_invitation')
export class Invitation {
  @PrimaryGeneratedColumn({ name: 'invitation_number' })
  id: number;

  @Column({ length: 320 })
  email: string;

  @Column({ length: 255, unique: true })
  token: string;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column({ name: 'is_used', default: false })
  isUsed: boolean;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'expire_at', type: 'timestamp', nullable: true })
  expireAt: Date;

  @ManyToOne(() => Residence, residence => residence.invitations)
  @JoinColumn({ name: 'residence_number' })
  residence: Residence;
}
