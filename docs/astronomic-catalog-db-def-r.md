classDiagram
direction BT
class Asteroid {
   int type_id
   int id
}
class AsteroidType {
   varchar(100) name
   int id
}
class BlackHole {
   decimal(15,4) mass_solar
   int id
}
class CelestialObject {
   varchar(100) global_name
   text description
   varchar(255) image_url
   datetime created_at
   datetime updated_at
   int id
}
class CelestialObjectWithType {
   int id
   varchar(100) global_name
   text description
   varchar(255) image_url
   varchar(17) object_type
}
class Comet {
   int type_id
   int id
}
class CometType {
   varchar(100) name
   int id
}
class Constellation {
   varchar(100) name
   varchar(30) abbreviation
   int id
}
class Galaxy {
   int galaxy_type_id
   decimal(10,4) distance_mly
   int id
}
class GalaxyArm {
   varchar(100) name
   int galaxy_id
   int id
}
class GalaxyType {
   varchar(100) name
   int id
}
class NaturalSatellite {
   decimal(10,4) mass_satellite
   decimal(10,4) radius_satellite
   int id
}
class Nebula {
   int neighborhood_id
   int id
}
class Observation {
   int celestial_object_id
   text notes
   int id
}
class Orbit {
   int celestial_object_id
   int primary_body_id
   decimal(10,4) semi_major_axis
   decimal(10,4) eccentricity
   decimal(10,4) orbital_period
   int id
}
class Planet {
   int planet_type_id
   decimal(10,4) mass_earth
   decimal(10,4) radius_earth
   int id
}
class PlanetType {
   varchar(100) name
   int id
}
class Star {
   int constellation_id
   int system_id
   int spectral_type_id
   decimal(10,4) mass_solar
   decimal(10,4) radius_solar
   int id
}
class StarCluster {
   int galaxy_id
   int id
}
class StarSpectralType {
   varchar(10) code
   text description
   int id
}
class StarSystem {
   varchar(100) name
   int neighborhood_id
   int id
}
class StellarNeighborhood {
   varchar(100) name
   int arm_id
   int id
}

Asteroid  -->  AsteroidType : type_id:id
Asteroid  -->  CelestialObject : id
BlackHole  -->  CelestialObject : id
Comet  -->  CelestialObject : id
Comet  -->  CometType : type_id:id
Galaxy  -->  CelestialObject : id
Galaxy  -->  GalaxyType : galaxy_type_id:id
GalaxyArm  -->  Galaxy : galaxy_id:id
NaturalSatellite  -->  CelestialObject : id
Nebula  -->  CelestialObject : id
Nebula  -->  StellarNeighborhood : neighborhood_id:id
Observation  -->  CelestialObject : celestial_object_id:id
Orbit  -->  CelestialObject : celestial_object_id:id
Orbit  -->  CelestialObject : primary_body_id:id
Planet  -->  CelestialObject : id
Planet  -->  PlanetType : planet_type_id:id
Star  -->  CelestialObject : id
Star  -->  Constellation : constellation_id:id
Star  -->  StarSpectralType : spectral_type_id:id
Star  -->  StarSystem : system_id:id
StarCluster  -->  CelestialObject : id
StarCluster  -->  Galaxy : galaxy_id:id
StarSystem  -->  StellarNeighborhood : neighborhood_id:id
StellarNeighborhood  -->  GalaxyArm : arm_id:id
