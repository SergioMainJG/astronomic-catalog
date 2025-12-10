CREATE TABLE `StarSystem`
(
    `id`              INT PRIMARY KEY AUTO_INCREMENT,
    `name`            VARCHAR(100) NOT NULL,
    `neighborhood_id` INT          NOT NULL,
    CONSTRAINT `check_star_system_name` CHECK ( `name` REGEXP '^[A-Za-z0-9 .+'',-]+$')
);