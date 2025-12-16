SELECT a.`global_name` AS `name`,
       a.`description` AS `description`,
       a.`image_url`   AS `image`,
       b.`mass_solar`  AS `mass (relative to solar mass)`
FROM `CelestialObject` a
         INNER JOIN BlackHole b
                    ON a.id = b.id
LIMIT 10;