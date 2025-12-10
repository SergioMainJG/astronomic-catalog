CREATE TABLE `StellarNeighborhood`
(
    `id`     INT PRIMARY KEY AUTO_INCREMENT,
    `name`   VARCHAR(100) NOT NULL,
    `arm_id` INT         NOT NULL,
    CONSTRAINT `check_stellar_neighborhood_name` CHECK ( `name` REGEXP '^[A-Za-z0-9 .+'',-]+$' )
);