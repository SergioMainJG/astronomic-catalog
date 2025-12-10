CREATE TABLE `Observation`
(
    `id`                  INT PRIMARY KEY AUTO_INCREMENT,
    `celestial_object_id` INT  NOT NULL,
    `notes`               TEXT NOT NULL,
    CONSTRAINT `check_observation_notes` CHECK ( `notes` REGEXP '^[A-Za-z0-9 .+'',-]+$')
);