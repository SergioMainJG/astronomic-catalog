import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CelestialObject } from '../../shared/entities/celestial-object.entity';

@Entity('Orbit')
export class Orbit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'celestial_object_id' })
  celestialObjectId: number;

  @Column({ name: 'primary_body_id' })
  primaryBodyId: number;

  @Column({ name: 'semi_major_axis', type: 'decimal', precision: 10, scale: 4 })
  semiMajorAxis: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  eccentricity: number;

  @Column({ name: 'orbital_period', type: 'decimal', precision: 10, scale: 4 })
  orbitalPeriod: number;

  // Relations
  @ManyToOne(() => CelestialObject)
  @JoinColumn({ name: 'celestial_object_id' })
  celestialObject: CelestialObject;

  @ManyToOne(() => CelestialObject)
  @JoinColumn({ name: 'primary_body_id' })
  primaryBody: CelestialObject;
}
