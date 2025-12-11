CREATE TABLE `AsteroidType`
(
    `id`   INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    CONSTRAINT `check_asteroid_type_name` CHECK ( `name` REGEXP '^[A-Za-z0-9 .+'',-]+$' )

);
