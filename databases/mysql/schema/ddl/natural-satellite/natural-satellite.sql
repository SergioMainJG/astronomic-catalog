CREATE TABLE `NaturalSatellite`
(
    `id`           INT PRIMARY KEY,
    `mass_satellite`   DECIMAL(10, 4) NOT NULL,
    `radius_satellite` DECIMAL(10, 4) NOT NULL,
    CONSTRAINT check_natural_satellite_mass CHECK ( `mass_satellite` > 0.0000 ),
    CONSTRAINT check_natural_satellite_radius CHECK ( `radius_satellite` > 0.0000 )
);