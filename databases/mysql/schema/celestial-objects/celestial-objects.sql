CREATE TABLE `CelestialObject`
(
    `id`          INT PRIMARY KEY AUTO_INCREMENT,
    `global_name` VARCHAR(100) NOT NULL,
    CONSTRAINT `unique_celestial_object_name` UNIQUE (`global_name`),
    CONSTRAINT `check_celestial_object_name` CHECK (`global_name` REGEXP '^[A-Za-z0-9 .+'',-]+$' )
);