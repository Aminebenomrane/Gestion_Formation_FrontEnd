import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './responsable/home/home.component';
import { LoginComponent } from './login/login.component';
import { FormationComponent } from './responsable/formation/formation.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'responsable/home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'responsable/formation', component: FormationComponent },
  { path: 'usernavbar', component: UserNavbarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
