CREATE TABLE `Constellation`
(
    `id`           INT PRIMARY KEY AUTO_INCREMENT,
    `name`         VARCHAR(100) NOT NULL,
    `abbreviation` VARCHAR(30)  NOT NULL,
    CONSTRAINT `check_constellation_name` CHECK (`name` REGEXP '^[A-Za-z0-9 .+'',-]+$' ),
    CONSTRAINT `check_constellation_abbreviation` CHECK ( `abbreviation` REGEXP '^[A-Za-z0-9 .+'',-]+$' )
);