CREATE TABLE `BlackHole`
(
    `id`         INT PRIMARY KEY,
    `mass_solar` DECIMAL(10, 4) NOT NULL,
    `galaxy_id`  INT            NOT NULL,
    `system_id`  INT            NOT NULL,
    CONSTRAINT `check_black_hole_mass_solar` CHECK ( `mass_solar` > 0.0000)
);