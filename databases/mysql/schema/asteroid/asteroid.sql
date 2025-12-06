CREATE TABLE `Asteroid` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `type_id` int,
  `system_id` int,
  `galaxy_id` int
);