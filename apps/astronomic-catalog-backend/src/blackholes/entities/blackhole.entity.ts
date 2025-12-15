import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { CelestialObject } from '../../shared/entities/celestial-object.entity';

@Entity('BlackHole')
export class BlackHole {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'mass_solar', type: 'decimal', precision: 15, scale: 4 })
  massSolar: number;

  @OneToOne(() => CelestialObject, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  celestialObject: CelestialObject;
}
