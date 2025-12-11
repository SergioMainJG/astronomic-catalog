#!/bin/bash
echo "Starting manual loading of schemas"

load_sql() {
    echo "Cargando: $1"
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
load_sql "/docker-entrypoint-initdb.d/users/users.sql"
echo "Carga completa de DDL"

echo "Sembrando datos iniciales..."
load_sql "/docker-entrypoint-initdb.d/seed/startup.sql"

echo "Carga completa de la seed"