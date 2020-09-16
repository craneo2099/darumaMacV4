import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DarumasGralPage } from './darumas-gral.page';

const routes: Routes = [
  {
    path: '',
    component: DarumasGralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DarumasGralPageRoutingModule {}
