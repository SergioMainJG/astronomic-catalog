import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { CelestialObject } from '../../shared/entities/celestial-object.entity';

@Entity('Planet')
export class Planet {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'planet_type_id' })
  planetTypeId: number;

  @Column({ name: 'mass_earth', type: 'decimal', precision: 10, scale: 4 })
  massEarth: number;

  @Column({ name: 'radius_earth', type: 'decimal', precision: 10, scale: 4 })
  radiusEarth: number;

  @OneToOne(() => CelestialObject, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  celestialObject: CelestialObject;
}
