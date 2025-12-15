import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, TableInheritance } from 'typeorm';

@Entity('CelestialObject')
@Entity('CelestialObject')
export class CelestialObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'global_name', unique: true, length: 100 })
  globalName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'image_url', length: 255, nullable: true, default: 'https://res.cloudinary.com/astronomic-catalog-images-assets/image/upload/v1765469146/default-image-astro-catalog_c41jrj.jpg' })
  imageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
