SELECT b.global_name     AS StarName,
       c.global_name     AS PlanetName,
       a.semi_major_axis AS DistanceAU
FROM Orbit a
         JOIN CelestialObject b ON a.primary_body_id = b.id
         JOIN CelestialObject c ON a.celestial_object_id = c.id;