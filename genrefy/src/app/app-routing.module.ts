import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SongsComponent } from './songs/songs.component';
import { FiltersComponent } from './filters/filters.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent, canActivate: [AuthGuard] },
  { path: 'filters', component: FiltersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
