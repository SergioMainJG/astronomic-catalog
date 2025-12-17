CREATE TABLE `Planet`
(
    `id`             INT PRIMARY KEY,
    `planet_type_id` INT            NOT NULL,
    `mass_earth`     DECIMAL(10, 4) NOT NULL,
    `radius_earth`   DECIMAL(10, 4) NOT NULL,
    CONSTRAINT `check_planet_mass_earth` CHECK ( `mass_earth` > 0.0000 ),
    CONSTRAINT `check_planet_radius_earth` CHECK ( `radius_earth` > 0.0000 )
);