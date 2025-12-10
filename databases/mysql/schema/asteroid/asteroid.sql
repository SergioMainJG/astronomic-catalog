CREATE TABLE `Asteroid`
(
    `id`        INT PRIMARY KEY,
    `type_id`   INT         NOT NULL,
    `system_id` INT         NOT NULL,
    `galaxy_id` INT         NOT NULL
);