DELIMITER $$
CREATE TRIGGER `before_natural_satellite_insert`
    BEFORE INSERT
    ON `NaturalSatellite`
    FOR EACH ROW
BEGIN
    IF NEW.mass_satellite <= 0.0000 THEN
        SET NEW.mass_satellite = 0.0001;
    END IF;

    IF NEW.radius_satellite <= 0.0000 THEN
        SET NEW.radius_satellite = 0.0001;
    END IF;
END$$

DELIMITER ;