DELIMITER $$
CREATE TRIGGER `before_orbit_insert`
    BEFORE INSERT
    ON `Orbit`
    FOR EACH ROW
BEGIN
    IF NEW.eccentricity <= 0.0000 THEN
        SET NEW.eccentricity = 0.0001;
    END IF;

    IF NEW.orbital_period <= 0.0000 THEN
        SET NEW.orbital_period = 0.0001;
    END IF;
END$$

DELIMITER ;