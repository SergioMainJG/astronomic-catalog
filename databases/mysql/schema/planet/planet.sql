CREATE TABLE `Planet`
(
    `id`             INT PRIMARY KEY,
    `star_id`        INT,
    `planet_type_id` INT,
    `mass_earth`     DECIMAL(10, 4),
    `radius_earth`   DECIMAL(10, 4),
    CONSTRAINT `check_planet_mass_earth` CHECK ( `mass_earth` > 0.0000 ),
    CONSTRAINT `check_planet_radius_earth` CHECK ( `radius_earth` > 0.0000 )
);