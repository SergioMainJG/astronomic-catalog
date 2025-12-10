USE astronomy_db;
/* database/mysql/schema/main.sql */

-- 1. Base (El Padre)
SOURCE /docker-entrypoint-initdb.d/celestial-objects/celestial-objects.sql;

-- 2. Tipos (Independientes)
SOURCE /docker-entrypoint-initdb.d/galaxy/galaxy.type.sql;
SOURCE /docker-entrypoint-initdb.d/planet/planet.type.sql;
SOURCE /docker-entrypoint-initdb.d/star-system/star-system.type.sql;
SOURCE /docker-entrypoint-initdb.d/asteroid/asteroid.type.sql;
SOURCE /docker-entrypoint-initdb.d/comet/comet.type.sql;

-- 3. Estructuras
SOURCE /docker-entrypoint-initdb.d/galaxy/galaxy.sql;
SOURCE /docker-entrypoint-initdb.d/galaxy/galaxy.arm.sql;
SOURCE /docker-entrypoint-initdb.d/stellar-neighborhood/stellar-neighborhood.sql;
SOURCE /docker-entrypoint-initdb.d/star-system/star-system.sql;
SOURCE /docker-entrypoint-initdb.d/constellation/constellation.sql;

-- 4. Objetos Hijos
SOURCE /docker-entrypoint-initdb.d/star/star.sql;
SOURCE /docker-entrypoint-initdb.d/planet/planet.sql;
SOURCE /docker-entrypoint-initdb.d/natural-satellite/natural-satellite.sql;
SOURCE /docker-entrypoint-initdb.d/asteroid/asteroid.sql;
SOURCE /docker-entrypoint-initdb.d/comet/comet.sql;
SOURCE /docker-entrypoint-initdb.d/black-hole/black-hole.sql;
SOURCE /docker-entrypoint-initdb.d/nebula/nebula.sql;
SOURCE /docker-entrypoint-initdb.d/star-cluster/star-cluster.sql;

-- 5. Órbitas y Observaciones
SOURCE /docker-entrypoint-initdb.d/orbit/orbit.sql;
SOURCE /docker-entrypoint-initdb.d/observation/observation.sql;

-- 6. Relaciones (Foreign Keys) - Al final
SOURCE /docker-entrypoint-initdb.d/foreign_keys.sql;

-- 7. Usuarios (Si creaste el archivo users.sql)
-- SOURCE /docker-entrypoint-initdb.d/users.sql;