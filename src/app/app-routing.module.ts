import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager/manager.component';
import { UserComponent } from './user/user.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  {path:'', component:ManagerComponent},
  {path:'user', component:UserComponent},
  {path:'basket', component:BasketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
