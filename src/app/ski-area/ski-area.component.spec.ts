import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkiAreaComponent } from './ski-area.component';

describe('SkiAreaComponent', () => {
  let component: SkiAreaComponent;
  let fixture: ComponentFixture<SkiAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkiAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkiAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
