CREATE TABLE `Observation` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `object_type` varchar(255),
  `object_id` int,
  `date_observed` date,
  `observer` varchar(255),
  `notes` text
);