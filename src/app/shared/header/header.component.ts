import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public linkCategories = {
    overview: [
      {name: 'Regions', route: 'regions', disabled: true},
      {name: 'Webcams', route: 'webcams', disabled: true}
    ],
    summer: [
      {name: 'Lakes', route: 'lakes', disabled: true},
      {name: 'Tours', route: 'tours', disabled: true}
    ],
    winter: [
      {name: 'Ski-Areas', route: 'ski-areas', disabled: false},
      {name: 'Cross-Country-Ski', route: 'cross-country-ski', disabled: true},
      {name: 'Snow Parks', route: 'snow-parks', disabled: true}
    ],
    experiences: [
      {name: 'Highlights', route: 'highlights', disabled: true},
      {name: 'Accommodations', route: 'accommodations', disabled: true},
      {name: 'Offers', route: 'offers', disabled: true},
      {name: 'Leisure Facilities', route: 'leisure-facilities', disabled: true},
      {name: 'Event Promoter', route: 'event-promoter', disabled: true},
    ],
  }


  constructor() { }

  ngOnInit(): void {
  }

}
