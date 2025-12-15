import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, TableInheritance } from 'typeorm';

@Entity('CelestialObject')
// @TableInheritance({ column: { type: 'varchar', name: 'type', nullable: true } }) // Using Single Table Inheritance or Concrete Table Inheritance? 
// Wait, the schema uses JOIN strategy (One-to-One with base table). 
// Accessing the schema again...
// The schema has `CelestialObject` table and then `BlackHole` table with `id` as FK to `CelestialObject(id)`.
// This is Class Table Inheritance in TypeORM (or just One-to-One relation if we want to be manual, but typical inheritance is easier).
// Let's look at TypeORM docs pattern for this... usually implies `@Entity` on subclass.
// However, standard TypeORM inheritance puts everything in one table or multiple.
// Given strict SQL schema matching: `BlackHole` has its own table sharing ID.
// This is best modeled as a One-to-One relationship where BlackHole "is a" CelestialObject, 
// OR TypeORM's Class Table Inheritance if compatible with existing schema.
// Schema: `id` INT PRIMARY KEY (in BlackHole) referencing CelestialObject.
// Let's try simple One-to-One with primary key join column for now to be safe with existing schema structure,
// but inheriting the class fields in code to keep it DRY.

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
