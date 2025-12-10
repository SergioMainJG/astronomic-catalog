#!/bin/bash
echo "Starting manual loading of schemas"

load_sql() {
    echo "Cargando: $1"
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" "$MYSQL_DATABASE" < "$1"
}

load_sql "/docker-entrypoint-initdb.d/celestial-objects/celestial-objects.sql"

load_sql "/docker-entrypoint-initdb.d/galaxy/galaxy.type.sql"
load_sql "/docker-entrypoint-initdb.d/planet/planet.type.sql"
load_sql "/docker-entrypoint-initdb.d/star-system/star-system.type.sql"
load_sql "/docker-entrypoint-initdb.d/asteroid/asteroid.type.sql"
load_sql "/docker-entrypoint-initdb.d/comet/comet.type.sql"

load_sql "/docker-entrypoint-initdb.d/galaxy/galaxy.sql"
load_sql "/docker-entrypoint-initdb.d/galaxy/galaxy.arm.sql"
load_sql "/docker-entrypoint-initdb.d/stellar-neighborhood/stellar-neighborhood.sql"
load_sql "/docker-entrypoint-initdb.d/star-system/star-system.sql"
load_sql "/docker-entrypoint-initdb.d/constellation/constellation.sql"

load_sql "/docker-entrypoint-initdb.d/star/star.sql"
load_sql "/docker-entrypoint-initdb.d/planet/planet.sql"
load_sql "/docker-entrypoint-initdb.d/natural-satellite/natural-satellite.sql"
load_sql "/docker-entrypoint-initdb.d/asteroid/asteroid.sql"
load_sql "/docker-entrypoint-initdb.d/comet/comet.sql"
load_sql "/docker-entrypoint-initdb.d/black-hole/black-hole.sql"
load_sql "/docker-entrypoint-initdb.d/nebula/nebula.sql"
load_sql "/docker-entrypoint-initdb.d/star-cluster/star-cluster.sql"

load_sql "/docker-entrypoint-initdb.d/orbit/orbit.sql"
load_sql "/docker-entrypoint-initdb.d/observation/observation.sql"

load_sql "/docker-entrypoint-initdb.d/foreign_keys.sql"
load_sql "/docker-entrypoint-initdb.d/users.sql"

echo "Carga completa."