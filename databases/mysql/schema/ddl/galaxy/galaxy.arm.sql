CREATE TABLE `GalaxyArm`
(
    `id`        INT PRIMARY KEY AUTO_INCREMENT,
    `name`      VARCHAR(100) NOT NULL,
    `galaxy_id` INT          NOT NULL,
    CONSTRAINT `check_galaxy_arm_name` CHECK ( `name` REGEXP '^[A-Za-z0-9 .+'',-]+$')
);