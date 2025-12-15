import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { CelestialObject } from '../../shared/entities/celestial-object.entity';

@Entity('Star')
export class Star {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'constellation_id' })
  constellationId: number;

  @Column({ name: 'system_id' })
  systemId: number;

  @Column({ name: 'spectral_type_id' })
  spectralTypeId: number;

  @Column({ name: 'mass_solar', type: 'decimal', precision: 10, scale: 4 })
  massSolar: number;

  @Column({ name: 'radius_solar', type: 'decimal', precision: 10, scale: 4 })
  radiusSolar: number;

  @OneToOne(() => CelestialObject, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  celestialObject: CelestialObject;
}
