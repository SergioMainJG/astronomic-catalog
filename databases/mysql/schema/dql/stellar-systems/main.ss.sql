SELECT a.name      AS SystemName,
       b.name      AS Neighborhood,
       COUNT(s.id) AS StarCount
FROM StarSystem a
         JOIN StellarNeighborhood b ON a.neighborhood_id = b.id
         LEFT JOIN Star s ON s.system_id = a.id
GROUP BY a.id;