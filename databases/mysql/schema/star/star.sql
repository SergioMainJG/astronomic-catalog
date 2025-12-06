CREATE TABLE `Star` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `system_id` int,
  `spectral_type_id` int,
  `mass_solar` float,
  `radius_solar` float
);