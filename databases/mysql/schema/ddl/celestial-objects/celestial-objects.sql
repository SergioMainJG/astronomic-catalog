CREATE TABLE `CelestialObject`
(
    `id`          INT PRIMARY KEY AUTO_INCREMENT,
    `global_name` VARCHAR(100) NOT NULL,
    `description` TEXT         NOT NULL,
    `image_url`   VARCHAR(255)          DEFAULT 'https://res.cloudinary.com/astronomic-catalog-images-assets/image/upload/v1765469146/default-image-astro-catalog_c41jrj.jpg',
    `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `unique_celestial_object_global_name` UNIQUE (`global_name`),
    CONSTRAINT `check_celestial_object_global_name` CHECK (`global_name` REGEXP '^[A-Za-z0-9 *.+''/,-]+$' ),
    CONSTRAINT `check_celestial_object_image_url` CHECK (`image_url` IS NULL OR `image_url` LIKE
                                                                                'https://res.cloudinary.com/astronomic-catalog-images-assets/%')
)