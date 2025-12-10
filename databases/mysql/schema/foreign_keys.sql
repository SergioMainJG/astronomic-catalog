ALTER TABLE `Galaxy`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `Star`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `Planet`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `NaturalSatellite`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `Asteroid`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `Comet`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `BlackHole`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `Nebula`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `StarCluster`
    ADD FOREIGN KEY (`id`) REFERENCES `CelestialObject` (`id`) ON DELETE CASCADE;

ALTER TABLE `Galaxy`
    ADD FOREIGN KEY (`galaxy_type_id`) REFERENCES `GalaxyType` (`id`);

ALTER TABLE `GalaxyArm`
    ADD FOREIGN KEY (`galaxy_id`) REFERENCES `Galaxy` (`id`);

ALTER TABLE `StellarNeighborhood`
    ADD FOREIGN KEY (`arm_id`) REFERENCES `GalaxyArm` (`id`);

ALTER TABLE `StarSystem`
    ADD FOREIGN KEY (`neighborhood_id`) REFERENCES `StellarNeighborhood` (`id`);

ALTER TABLE `Star`
    ADD FOREIGN KEY (`spectral_type_id`) REFERENCES `StarSpectralType` (`id`);

ALTER TABLE `Planet`
    ADD FOREIGN KEY (`planet_type_id`) REFERENCES `PlanetType` (`id`);

ALTER TABLE `Asteroid`
    ADD FOREIGN KEY (`type_id`) REFERENCES `AsteroidType` (`id`);

ALTER TABLE `Comet`
    ADD FOREIGN KEY (`type_id`) REFERENCES `CometType` (`id`);

ALTER TABLE `Nebula`
    ADD FOREIGN KEY (`neighborhood_id`) REFERENCES `StellarNeighborhood` (`id`);

ALTER TABLE `StarCluster`
    ADD FOREIGN KEY (`galaxy_id`) REFERENCES `Galaxy` (`id`);