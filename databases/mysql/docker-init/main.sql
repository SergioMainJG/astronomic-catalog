USE astronomy_db;

SOURCE /docker-entrypoint-initdb.d/celestial-objects/celestial-objects.sql;

SOURCE /docker-entrypoint-initdb.d/galaxy/galaxy.type.sql;
SOURCE /docker-entrypoint-initdb.d/planet/planet.type.sql;
SOURCE /docker-entrypoint-initdb.d/star-system/star-system.type.sql;
SOURCE /docker-entrypoint-initdb.d/asteroid/asteroid.type.sql;
SOURCE /docker-entrypoint-initdb.d/comet/comet.type.sql;

SOURCE /docker-entrypoint-initdb.d/galaxy/galaxy.sql;
SOURCE /docker-entrypoint-initdb.d/galaxy/galaxy.arm.sql;

SOURCE /docker-entrypoint-initdb.d/stellar-neighborhood/stellar-neighborhood.sql;
SOURCE /docker-entrypoint-initdb.d/star-system/star-system.sql;

SOURCE /docker-entrypoint-initdb.d/constellation/constellation.sql;

SOURCE /docker-entrypoint-initdb.d/star/star.sql;
SOURCE /docker-entrypoint-initdb.d/planet/planet.sql;
SOURCE /docker-entrypoint-initdb.d/natural-satellite/natural-satellite.sql;
SOURCE /docker-entrypoint-initdb.d/asteroid/asteroid.sql;
SOURCE /docker-entrypoint-initdb.d/comet/comet.sql;
SOURCE /docker-entrypoint-initdb.d/black-hole/black-hole.sql;
SOURCE /docker-entrypoint-initdb.d/nebula/nebula.sql;
SOURCE /docker-entrypoint-initdb.d/star-cluster/star-cluster.sql;

SOURCE /docker-entrypoint-initdb.d/orbit/orbit.sql;
SOURCE /docker-entrypoint-initdb.d/observation/observation.sql;

SOURCE /docker-entrypoint-initdb.d/foreign_keys.sql;

SOURCE /docker-entrypoint-initdb.d/users.sql;