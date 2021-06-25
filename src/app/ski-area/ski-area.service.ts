import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../shared/info-dialog/info-dialog.component';
import { SkiArea } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class SkiAreaService {

  constructor(
    public dialog: MatDialog,
  ) { }

  getTemplateSkiAreas(): SkiArea[] {
    const skiAreas = [
      {
        name: 'Ski Area One',
        snowM: 3,
        altitudeKM: 15,
        country: 'Austria',
        liftFacilities: {
          drag: 2,
          chair: 2,
          cable: 3,
          aerial: 4,
        },

        pistes: {
          easyKM: 15,
          mediumKM: 5,
          difficultKM: 0,
        }
      },
      {
        name: 'Ski Area Two',
        snowM: 5,
        altitudeKM: 34,
        country: 'Austria',
        liftFacilities: {
          drag: 5,
          chair: 0,
          cable: 2,
          aerial: 1,
        },

        pistes: {
          easyKM: 10,
          mediumKM: 15,
          difficultKM: 10,
        }
      },
      {
        name: 'Ski Area Three',
        snowM: 1,
        altitudeKM: 5,
        country: 'Germany',
        liftFacilities: {
          drag: 12,
          chair: 5,
          cable: 5,
          aerial: 0,
        },

        pistes: {
          easyKM: 25,
          mediumKM: 15,
          difficultKM: 10,
        }
      },
      {
        name: 'Ski Area Four',
        snowM: 5,
        altitudeKM: 12,
        country: 'Germany',
        liftFacilities: {
          drag: 3,
          chair: 2,
          cable: 2,
          aerial: 2,
        },

        pistes: {
          easyKM: 10,
          mediumKM: 10,
          difficultKM: 3,
        }
      },
      {
        name: 'Ski Area Five',
        snowM: 5,
        altitudeKM: 56,
        country: 'Swiss',
        liftFacilities: {
          drag: 12,
          chair: 7,
          cable: 7,
          aerial: 9,
        },

        pistes: {
          easyKM: 38,
          mediumKM: 55,
          difficultKM: 28,
        }
      },

    ];


    return skiAreas;
  }


  filterAreasSingle(skiAreas: SkiArea[], filter: 'altitude' | 'snow', value: number) {
    if(filter === 'altitude') {
      return skiAreas.filter(skiArea => skiArea.altitudeKM >= value);
    } else {
      return skiAreas.filter(skiArea => skiArea.snowM >= value);
    }
  }

  filterAreasMultiple(skiAreas: SkiArea[], value: string[]) {
    return skiAreas.filter(skiArea => value.includes(skiArea.country));
  }


  filterAreasLifts(skiAreas: SkiArea[], value: {drag: number, chair: number, cable: number, aerial: number}) {
    return skiAreas.filter(skiArea => {
      if(
        skiArea.liftFacilities.drag >= +value.drag &&
        skiArea.liftFacilities.chair >= +value.chair &&
        skiArea.liftFacilities.cable >= +value.cable &&
        skiArea.liftFacilities.aerial >= +value.aerial
        ) {
          return skiArea;
      } else {
        return 0;
      }
    });
  }

  filterAreasPistes(skiAreas: SkiArea[], value: {easyKM: number, mediumKM: number, difficultKM: number}) {
    return skiAreas.filter(skiArea => {
      if(
        skiArea.pistes.easyKM >= +value.easyKM &&
        skiArea.pistes.mediumKM >= +value.mediumKM &&
        skiArea.pistes.difficultKM >= +value.difficultKM
        ) {
          return skiArea;
      } else {
        return 0;
      }
    });
  }


  openDialog(type: 'filter-select') {
    const dialogRef = this.dialog.open(InfoDialogComponent, { width: '512px'});
  }
}

