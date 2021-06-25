export interface SkiArea {
  name: string;
  snowM: number;
  altitudeKM: number;
  country: string;
  liftFacilities: {
    drag: number;
    chair: number;
    cable: number;
    aerial: number;
  };

  pistes: {
    easyKM: number;
    mediumKM: number;
    difficultKM: number;
  }
}
