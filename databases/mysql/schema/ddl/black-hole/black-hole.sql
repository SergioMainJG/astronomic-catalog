CREATE TABLE `BlackHole`
(
    `id`         INT PRIMARY KEY,
    `mass_solar` DECIMAL(15, 4) NOT NULL,
    CONSTRAINT `check_black_hole_mass_solar` CHECK ( `mass_solar` > 0.0000)
);