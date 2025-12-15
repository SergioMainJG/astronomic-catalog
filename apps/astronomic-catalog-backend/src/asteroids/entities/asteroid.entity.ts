import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { CelestialObject } from '../../shared/entities/celestial-object.entity';

@Entity('Asteroid')
export class Asteroid {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'type_id' })
  typeId: number;

  @OneToOne(() => CelestialObject, { cascade: true, eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  celestialObject: CelestialObject;
}
