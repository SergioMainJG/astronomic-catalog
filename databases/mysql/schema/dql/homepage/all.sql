SELECT *
FROM `astronomic-catalog-db`.`CelestialObject`
ORDER BY id;


-- Todo alv
SELECT a.`id`,
       a.`global_name` AS `name`,
       a.`description` AS `description`,
       a.`image_url`   AS `image source`
FROM `astronomic-catalog-db`.`CelestialObject` a
         LEFT JOIN `Planet` p ON p.`id` = a.id
         LEFT JOIN `Star` s ON s.`id` = a.id
         LEFT JOIN `Asteroid` t ON t.`id` = a.id
         LEFT JOIN `BlackHole` b ON b.`id` = a.id
         LEFT JOIN `Comet` c ON c.`id` = a.id
         LEFT JOIN `Galaxy` g ON g.`id` = a.id
         LEFT JOIN `NaturalSatellite` n ON n.`id` = a.id
         LEFT JOIN `Nebula` e ON e.`id` = a.id
         LEFT JOIN `StarSystem` r ON r.`id` = a.id
         LEFT JOIN `StarCluster` l ON l.`id` = a.id;