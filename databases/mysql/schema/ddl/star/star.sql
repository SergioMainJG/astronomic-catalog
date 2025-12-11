CREATE TABLE `Star`
(
    `id`               INT PRIMARY KEY,
    `constellation_id` INT NOT NULL,
    `system_id`        INT NOT NULL,
    `spectral_type_id` INT NOT NULL,
    `mass_solar`       DECIMAL(10, 4) NOT NULL,
    `radius_solar`     DECIMAL(10, 4) NOT NULL,
    CONSTRAINT `check_star_mass_solar` CHECK ( `mass_solar` > 0.0000),
    CONSTRAINT `check_star_radius_solar` CHECK ( `radius_solar` > 0.0000)
);