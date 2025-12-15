import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

@ViewEntity({
  name: 'CelestialObjectWithType',
  expression: `
    SELECT c.id,
           c.global_name,
           c.description,
           c.image_url,
           CASE
               WHEN p.id IS NOT NULL THEN 'Planet'
               WHEN s.id IS NOT NULL THEN 'Star'
               WHEN g.id IS NOT NULL THEN 'Galaxy'
               WHEN n.id IS NOT NULL THEN 'Nebula'
               WHEN bh.id IS NOT NULL THEN 'Black Hole'
               WHEN cs.id IS NOT NULL THEN 'Natural Satellite'
               WHEN a.id IS NOT NULL THEN 'Asteroid'
               WHEN co.id IS NOT NULL THEN 'Comet'
               WHEN sc.id IS NOT NULL THEN 'Star Cluster'
               ELSE 'Unknown'
               END AS object_type
    FROM CelestialObject c
             LEFT JOIN Planet p ON p.id = c.id
             LEFT JOIN Star s ON s.id = c.id
             LEFT JOIN Galaxy g ON g.id = c.id
             LEFT JOIN Nebula n ON n.id = c.id
             LEFT JOIN BlackHole bh ON bh.id = c.id
             LEFT JOIN NaturalSatellite cs ON cs.id = c.id
             LEFT JOIN Asteroid a ON a.id = c.id
             LEFT JOIN Comet co ON co.id = c.id
             LEFT JOIN StarCluster sc ON sc.id = c.id
  ` // Providing the expression is good practice for TypeORM to sync, though we assume DB manages it.
})
export class CelestialObjectWithType {
  @PrimaryColumn()
  id: number;

  @ViewColumn({ name: 'global_name' })
  globalName: string;

  @ViewColumn()
  description: string;

  @ViewColumn({ name: 'image_url' })
  imageUrl: string;

  @ViewColumn({ name: 'object_type' })
  objectType: string;
}
