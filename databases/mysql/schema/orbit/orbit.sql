CREATE TABLE `Orbit` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `object_type` varchar(255),
  `object_id` int,
  `semi_major_axis` float,
  `eccentricidad` float,
  `orbital_period` float
);