CREATE TABLE `Planet` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `star_id` int,
  `planet_type_id` int,
  `mass_earth` float,
  `radius_earth` float
);