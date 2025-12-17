import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { StellarNeighborhood } from './stellar-neighborhood.entity';
import { Star } from '../../stars/entities/star.entity';

@Entity('StarSystem')
export class StarSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'neighborhood_id' })
  neighborhoodId: number;

  @ManyToOne(() => StellarNeighborhood)
  @JoinColumn({ name: 'neighborhood_id' })
  neighborhood: StellarNeighborhood;

  @OneToMany(() => Star, (star) => star.starSystem)
  stars: Star[];
}
