CREATE TABLE `StarCluster`
(
    `id`        INT PRIMARY KEY,
    `name`      VARCHAR(100),
    `galaxy_id` INT,
    CONSTRAINT `check_star_cluster_name` CHECK ( `name` REGEXP '^[A-Za-z0-9 .+\-]+$')
);