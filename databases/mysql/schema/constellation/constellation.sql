CREATE TABLE `Constellation`
(
    `id`           INT PRIMARY KEY AUTO_INCREMENT,
    `abbreviation` VARCHAR(30) NOT NULL,
    CONSTRAINT `check_constellation_abbreviation` CHECK ( `abbreviation` REGEXP '^[A-Za-z0-9 .+'',-]+$' )
);