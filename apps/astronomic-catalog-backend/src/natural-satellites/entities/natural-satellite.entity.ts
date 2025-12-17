import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { CelestialObject } from '../../shared/entities/celestial-object.entity';

@Entity('NaturalSatellite')
export class NaturalSatellite {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'mass_satellite', type: 'decimal', precision: 10, scale: 4 })
  massSatellite: number;

  @Column({ name: 'radius_satellite', type: 'decimal', precision: 10, scale: 4 })
  radiusSatellite: number;

  @OneToOne(() => CelestialObject, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  celestialObject: CelestialObject;
}
