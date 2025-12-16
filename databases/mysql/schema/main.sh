#!/bin/bash
echo "Starting manual loading of schemas"

load_sql() {
    echo "Loading - Cargando: $1"
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < "$1"
}

load_sql "/docker-entrypoint-initdb.d/ddl/celestial-objects/celestial-objects.sql"

load_sql "/docker-entrypoint-initdb.d/ddl/galaxy/galaxy.type.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/planet/planet.type.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/star-system/star-system.type.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/asteroid/asteroid.type.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/comet/comet.type.sql"

load_sql "/docker-entrypoint-initdb.d/ddl/galaxy/galaxy.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/galaxy/galaxy.arm.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/stellar-neighborhood/stellar-neighborhood.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/star-system/star-system.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/constellation/constellation.sql"

load_sql "/docker-entrypoint-initdb.d/ddl/star/star.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/planet/planet.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/natural-satellite/natural-satellite.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/asteroid/asteroid.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/comet/comet.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/black-hole/black-hole.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/nebula/nebula.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/star-cluster/star-cluster.sql"

load_sql "/docker-entrypoint-initdb.d/ddl/orbit/orbit.sql"
load_sql "/docker-entrypoint-initdb.d/ddl/observation/observation.sql"

load_sql "/docker-entrypoint-initdb.d/ddl/foreign_keys.sql"

echo "Loading triggers - Carga de triggers"
load_sql "/docker-entrypoint-initdb.d/triggers/validate-created_at.celestial-object.sql"
load_sql "/docker-entrypoint-initdb.d/triggers/validate-updated_at.natural-satellite.sql"
load_sql "/docker-entrypoint-initdb.d/triggers/validate-mass_planet.natural-satellite.sql"
load_sql "/docker-entrypoint-initdb.d/triggers/validate-eccentricity.celestial-object.sql"

echo "Loading users - Carga de usuarios"
load_sql "/docker-entrypoint-initdb.d/users/users.sql"

echo "Loading ddl - Carga completa de DDL"

echo "Seed startup - data Sembrando datos iniciales..."
load_sql "/docker-entrypoint-initdb.d/seed/startup.sql"

echo "Loading completed of seed - Carga completa de la seed"
echo "Creating views - Creando vistas"
load_sql "/docker-entrypoint-initdb.d/views/celestial-object-type.sql"
echo "Database ready - Base de datos lista"