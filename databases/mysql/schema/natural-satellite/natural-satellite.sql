CREATE TABLE `NaturalSatellite`
(
    `id`           INT PRIMARY KEY,
    `mass_earth`   DECIMAL(10, 4) NOT NULL,
    `radius_earth` DECIMAL(10, 4) NOT NULL,
    CONSTRAINT `check_natural_satellite_mass_earth` CHECK ( `mass_earth` > 0.0000 ),
    CONSTRAINT `check_natural_satellite_radius_earth` CHECK ( `radius_earth` > 0.0000 )
);