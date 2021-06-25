import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SkiAreaComponent } from './ski-area/ski-area.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
  },
  {
    path: 'ski-areas',
    component: SkiAreaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
