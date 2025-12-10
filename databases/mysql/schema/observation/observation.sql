CREATE TABLE `Observation`
(
    `id`                  INT PRIMARY KEY AUTO_INCREMENT,
    `celestial_object_id` INT  NOT NULL,
    `notes`               TEXT NOT NULL
);