CREATE TABLE `Galaxy`
(
    `id`             INT PRIMARY KEY,
    `galaxy_type_id` INT NOT NULL,
    `distance_mly`   DECIMAL(10, 4),
    CONSTRAINT `check_galaxy_distance_mly` CHECK (`distance_mly` > 0.0000)
);
