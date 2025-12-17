CREATE TABLE `PlanetType`
(
    `id`   INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    CONSTRAINT `check_planet_type_name` CHECK ( `name` REGEXP '^[A-Za-z0-9 .+'',-]+$')
);



START TRANSACTION;
INSERT INTO `CelestialObject` (global_name, description)
VALUES ('namek', 'destruido por Goku y Freezer');

SET @new_id = LAST_INSERT_ID();
INSERT INTO `Planet` (id, planet_type_id, mass_earth, radius_earth)
VALUES (@new_id, 1, 0.0001, 0.0001);
COMMIT;

SELECT CelestialObject.*
FROM CelestialObject
WHERE id = @new_id;


SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO `CelestialObject` (id, global_name, description)
VALUES (275, 'planeta bonito', 'pues un planeta bonit');
INSERT INTO `Planet` (id, planet_type_id, mass_earth, radius_earth)
VALUES (275, 2, 123.0200, 153.3243);
SET FOREIGN_KEY_CHECKS = 1;


(SELECT
    b.global_name,
    a.mass_solar
FROM Star a
JOIN CelestialObject b  ON a.id = b.id
WHERE a.mass_solar > 10000000000.0
)
    UNION(
SELECT
    b.global_name,
    a.mass_solar
FROM BlackHole a
    JOIN CelestialObject b ON a.id = b.id
    WHERE a.mass_solar > 10000000000.0
);