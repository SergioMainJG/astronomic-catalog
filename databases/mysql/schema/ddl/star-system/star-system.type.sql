CREATE TABLE `StarSpectralType`
(
    `id`          INT PRIMARY KEY AUTO_INCREMENT,
    `code`        VARCHAR(10) NOT NULL,
    `description` TEXT        NOT NULL,
    CONSTRAINT `check_star_spectral_type_code` CHECK ( `code` REGEXP '^[OBAFGKMLTYDSCW][A-Za-z0-9]*.*$'),
    CONSTRAINT `check_star_spectral_type_description` CHECK ( `description` REGEXP '^[A-Za-z0-9 .+'',-]+$')
);