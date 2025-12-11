DELIMITER $$

CREATE TRIGGER trigger_celestial_object_before_insert
    BEFORE INSERT
    ON CelestialObject
    FOR EACH ROW
BEGIN
    IF NEW.`created_at` > CURRENT_TIMESTAMP THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'created_at can not be over the present time';
    END IF;
END$$

DELIMITER ;