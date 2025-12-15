export interface CelestialObjectWithType {
  id: number;
  globalName: string;
  description: string;
  imageUrl: string;
  objectType: string;
}

export interface CelestialObject {
  id: number;
  globalName: string;
  description: string;
  imageUrl: string;
}

export interface BlackHole {
  id: number;
  globalName: string; // From CelestialObject
  description: string;
  imageUrl: string;
  massSolar: number;
  celestialObject: CelestialObject;
}

export interface Galaxy {
  id: number;
  globalName: string;
  description: string;
  imageUrl: string;
  galaxyType: string;
  celestialObject: CelestialObject;
}

export interface StarSystem {
  id: number;
  name: string;
  neighborhood: {
    id: number;
    name: string;
  };
  stars: any[]; // Adjust based on actual response if needed
}

export interface Orbit {
  id: number;
  celestialObject: {
    globalName: string;
  };
  primaryBody: {
    globalName: string;
  };
  semiMajorAxis: number;
  // Mapped for DQL: StarName, PlanetName, DistanceAU
}
