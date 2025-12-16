import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('StellarNeighborhood')
export class StellarNeighborhood {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

}
