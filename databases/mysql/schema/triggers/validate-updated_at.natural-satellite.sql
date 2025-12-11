DELIMITER $$

CREATE TRIGGER trigger_celestial_object_before_update
    BEFORE UPDATE
    ON CelestialObject
    FOR EACH ROW
BEGIN
    IF NEW.`updated_at` > CURRENT_TIMESTAMP THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'updated_at can not be over the present time';
    END IF;

    IF NEW.`updated_at` < NEW.`created_at` THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'updated_at can not be set before created_at times';
    END IF;
END$$

DELIMITER ;