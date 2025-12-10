CREATE TABLE `Star`
(
    `id`               INT PRIMARY KEY,
    `system_id`        INT,
    `spectral_type_id` INT,
    `mass_solar`       DECIMAL(10, 4),
    `radius_solar`     DECIMAL(10, 4),
    CONSTRAINT `check_star_mass_solar` CHECK ( `mass_solar` > 0.0000),
    CONSTRAINT `check_star_radius_solar` CHECK ( `radius_solar` > 0.0000)
);