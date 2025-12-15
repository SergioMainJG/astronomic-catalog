SELECT *
FROM `astronomic-catalog-db`.`CelestialObject` a
         INNER JOIN `astronomic-catalog-db`.`Galaxy` b
                    ON a.id = b.id
;