import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { CelestialObject } from '../../shared/entities/celestial-object.entity';

@Entity('Galaxy')
export class Galaxy {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'galaxy_type_id' })
  galaxyTypeId: number;

  @Column({ name: 'distance_mly', type: 'decimal', precision: 10, scale: 4 })
  distanceMly: number;

  @OneToOne(() => CelestialObject, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  celestialObject: CelestialObject;
}
