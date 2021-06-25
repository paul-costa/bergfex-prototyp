import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SkiAreaService } from './ski-area.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { SkiArea } from '../shared/model';


export interface Category {
  id: string;
  allComplete?: boolean;
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Category[];
}

export interface SkiAreaTable extends SkiArea {
  position: number;
}



@Component({
  selector: 'app-ski-area',
  templateUrl: './ski-area.component.html',
  styleUrls: ['./ski-area.component.scss']
})
export class SkiAreaComponent implements OnInit, OnDestroy {
  selectCategories = true;
  filterSelected = false;

  countryFormGroup: FormGroup | undefined;
  altitudeFormGroup: FormGroup | undefined;
  snowHeightFormGroup: FormGroup | undefined;
  liftFormGroup: FormGroup | undefined;
  pistesFormGroup: FormGroup | undefined;

  allCategories: Category[] = [
    {
      id: '1altitude',
      allComplete: false,
      name: 'Min. Altitude',
      completed: false,
      color: 'primary',
    },
    {
      id: '2snow-height',
      allComplete: false,
      name: 'Min. Snow Height',
      completed: false,
      color: 'primary',
    },
    {
      id: '3country',
      allComplete: false,
      name: 'Country',
      completed: false,
      color: 'primary',
      subtasks: [
        {id: 'at', name: 'Austria', completed: false, color: 'accent'},
        {id: 'de', name: 'Germany', completed: false, color: 'accent'},
        {id: 'ch', name: 'Swiss', completed: false, color: 'accent'}
      ]
    },
    {
      id: '4lift-facilities',
      allComplete: false,
      name: 'Lift Facilities',
      completed: false,
      color: 'primary',
      subtasks: [
        {id: 'drag', name: 'Drag', completed: false, color: 'accent'},
        {id: 'chair', name: 'Chair', completed: false, color: 'accent'},
        {id: 'cable', name: 'Cable', completed: false, color: 'accent'},
        {id: 'aerial', name: 'Aerial', completed: false, color: 'accent'}
      ]
    },
    {
      id: '5pistes',
      allComplete: false,
      name: 'Pistes',
      completed: false,
      color: 'primary',
      subtasks: [
        {id: 'easy', name: 'Easy', completed: false, color: 'accent'},
        {id: 'medium', name: 'Medium', completed: false, color: 'accent'},
        {id: 'difficult', name: 'Difficult', completed: false, color: 'accent'}
      ]
    },
  ];


  public COUNTRIES = [
    'Austria',
    'Germany',
    'Swiss',
  ]

  public liftControls: string[] | undefined = [];
  public pistesControls: string[] | undefined  = [];

  public skiAreas: SkiArea[] | undefined;


  displayedColumns: string[] = ['position', 'name', 'snowM', 'altitudeKM', 'country', 'liftFacilities', 'pistes'];
  public skiAreaTableDataSource: SkiAreaTable[] = [];


  constructor(
    private skiAreaService: SkiAreaService,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.resetAllCategories();
  }

  ngOnDestroy() {
    location.reload();
  }

  onReload() {
    location.reload();
  }


  resetAllCategories() {
    this.filterSelected = false;
    this.selectCategories = true;

    this.allCategories = [
      {
        id: '1altitude',
        allComplete: false,
        name: 'Min. Altitude',
        completed: false,
        color: 'primary',
      },
      {
        id: '2snow-height',
        allComplete: false,
        name: 'Min. Snow Height',
        completed: false,
        color: 'primary',
      },
      {
        id: '3country',
        allComplete: false,
        name: 'Country',
        completed: false,
        color: 'primary'
      },
      {
        id: '4lift-facilities',
        allComplete: false,
        name: 'Lift Facilities',
        completed: false,
        color: 'primary',
        subtasks: [
          {id: 'drag', name: 'Drag', completed: false, color: 'accent'},
          {id: 'chair', name: 'Chair', completed: false, color: 'accent'},
          {id: 'cable', name: 'Cable', completed: false, color: 'accent'},
          {id: 'aerial', name: 'Aerial', completed: false, color: 'accent'}
        ]
      },
      {
        id: '5pistes',
        allComplete: false,
        name: 'Pistes',
        completed: false,
        color: 'primary',
        subtasks: [
          {id: 'easy', name: 'Easy', completed: false, color: 'accent'},
          {id: 'medium', name: 'Medium', completed: false, color: 'accent'},
          {id: 'difficult', name: 'Difficult', completed: false, color: 'accent'}
        ]
      },
    ];

    this.skiAreas = this.skiAreaService.getTemplateSkiAreas();
    this.filterTable(this.skiAreas);
  }


  private filterTable(skiAreas: SkiArea[]) {
    this.skiAreaTableDataSource = [];

    for(let i=0; i<skiAreas.length; i++) {
      this.skiAreaTableDataSource.push({...skiAreas[i], position: i})
    }
  }

  // category selection
  updateAllComplete(categoryId: string) {
    const category = this.allCategories.find(category => category.id === categoryId);

    if(category === undefined) {
      return;
    }

    category.allComplete = category.subtasks != null && category.subtasks.every(t => t.completed);
    this.updateAllCategories(category);
  }

  someComplete(categoryId: string): boolean {
    const category = this.allCategories.find(category => category.id === categoryId);

    if(!category || !category.subtasks) {
      return false;
    }

    category.completed = category.subtasks.filter(t => t.completed).length > 0 && !category.allComplete;
    this.updateAllCategories(category);
    return category.completed;
  }

  setAll(completed: boolean, categoryId: string) {
    const category = this.allCategories.find(category => category.id === categoryId);

    if(!category) {
      return;
    }

    if(category.subtasks) {
      category.subtasks.forEach(t => t.completed = completed);
    }
    category.allComplete = true;
    this.updateAllCategories(category);
  }

  private updateAllCategories(category: Category) {
    this.allCategories = [...this.allCategories.filter(categoryItem => categoryItem.id !== category.id), category].sort((a,b) => +a.id.split('')[0] - +b.id.split('')[0]);
  }


  // category selection fields (stepper)
  onFilterSelection() {
    this.selectCategories = !this.selectCategories;
    this.filterSelected = true;


    this.initializeFormGroups(this.allCategories.filter(category => {
      if(category.allComplete || category.completed) {
        return category;
      } else {
        return null;
      }
    }));
  }

  private initializeFormGroups(categoriesToInitialize: Category[]) {
    const formGroupIds = categoriesToInitialize.map(category => category.id);

    if(formGroupIds.includes('1altitude')) {
      this.altitudeFormGroup = this._formBuilder.group({
        altitude: ['', Validators.required]
      });
    }

    if(formGroupIds.includes('2snow-height')) {
      this.snowHeightFormGroup = this._formBuilder.group({
        snowHeight: ['', Validators.required]
      });
    }

    if(formGroupIds.includes('3country')) {
      this.countryFormGroup = this._formBuilder.group({
        countries: ['', Validators.required]
      });
    }

    if(formGroupIds.includes('4lift-facilities')) {
      const indexOfLiftCategories = formGroupIds.indexOf('4lift-facilities');
      this.liftControls = categoriesToInitialize.map(category => category.subtasks?.filter(subtask => subtask.completed || subtask.allComplete))[indexOfLiftCategories]?.map(category => category.id);
      this.liftFormGroup = this._formBuilder.group({});

      if(this.liftControls) {
        for(const liftControl of this.liftControls) {
          this.liftFormGroup.addControl(liftControl, this._formBuilder.control(''));
        }
      }
    }

    if(formGroupIds.includes('5pistes')) {
      const indexOfPistesCategories = formGroupIds.indexOf('5pistes');
      this.pistesControls = categoriesToInitialize.map(category => category.subtasks?.filter(subtask => subtask.completed || subtask.allComplete))[indexOfPistesCategories]?.map(category => category.id);
      this.pistesFormGroup = this._formBuilder.group({});

      if(this.pistesControls) {
        for(const pistesControl of this.pistesControls) {
          this.pistesFormGroup.addControl(pistesControl, this._formBuilder.control(''));
        }
      }
    }
  }


  // list of pistes
  onFilterPistes() {
    const filterObj: any = {  }

    if(this.altitudeFormGroup) filterObj.altitude = this.altitudeFormGroup.value['altitude'];
    if(this.snowHeightFormGroup) filterObj.snow = this.snowHeightFormGroup.value['snowHeight'];
    if(this.countryFormGroup) filterObj.country = this.countryFormGroup.value['countries'];
    if(this.liftFormGroup) filterObj.lift = this.liftFormGroup.value;
    if(this.pistesFormGroup) filterObj.pistes = this.pistesFormGroup.value;


    // filter pistes database by each group and display it
    for (const key of Object.keys(filterObj)) {
      if(key === 'altitude') {
        this.skiAreas = this.skiAreaService.filterAreasSingle(this.skiAreas as SkiArea[], 'altitude', filterObj[key])
      } else if(key === 'snow') {
        this.skiAreas = this.skiAreaService.filterAreasSingle(this.skiAreas as SkiArea[], 'snow', filterObj[key])
      }  else if(key === 'country') {
        this.skiAreas = this.skiAreaService.filterAreasMultiple(this.skiAreas as SkiArea[], filterObj[key])
      } else if(key === 'lift') {
        this.skiAreas = this.skiAreaService.filterAreasLifts(this.skiAreas as SkiArea[], filterObj[key])
      } else if(key === 'pistes') {
        this.skiAreas = this.skiAreaService.filterAreasPistes(this.skiAreas as SkiArea[], filterObj[key])
      }
    }

    this.filterTable(this.skiAreas as SkiArea[]);
  }



  // additional methods
  onOpenDialog(type: 'filter-select') {
    this.skiAreaService.openDialog(type);
  }

  onGetTooltipForCategory(id: string) {
    switch (id) {
      case '1altitude':
        return 'Apply a minimum altitude selection in kilometers.'

      case '2snow-height':
        return 'Apply a minimum snow height selection in meters.'

      case '3country':
        return 'Select one country or more.'

      case '4lift-facilities':
        return 'Select the amount of lift facilities by category.'

      case '5pistes':
        return 'Select the minimum required length (in km) of pistes by difficulty.'

      default:
        return ''
    }
  }
}
