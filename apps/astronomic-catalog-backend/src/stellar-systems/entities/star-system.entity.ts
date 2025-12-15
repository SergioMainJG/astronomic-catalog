import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('StarSystem')
export class StarSystem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'neighborhood_id' })
  neighborhoodId: number;
}
