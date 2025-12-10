CREATE TABLE `Orbit`
(
    `id`                  INT PRIMARY KEY AUTO_INCREMENT,
    `celestial_object_id` INT            NOT NULL,
    `primary_body_id`     INT,
    `semi_major_axis`     DECIMAL(10, 4) NOT NULL,
    `eccentricity`        DECIMAL(10, 4) NOT NULL,
    `orbital_period`      DECIMAL(10, 4) NOT NULL,
    CONSTRAINT `check_orbit_semi_major_axis` CHECK ( `semi_major_axis` > 0.0000),
    CONSTRAINT `check_orbit_eccentricity` CHECK ( `eccentricity` > 0.0000 ),
    CONSTRAINT `check_orbit_orbital_period` CHECK ( `orbital_period` > 0.0000 )
);