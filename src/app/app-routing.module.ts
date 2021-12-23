import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ResourceComponent } from './resource/resource.component';
import { LoginComponent } from './login/login.component';
import { LoginAuthService } from './services/login/login-auth.service';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  { path: 'projects', component: ProjectComponent },
  { path: 'resource', component: ResourceComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'content',
    component: ContentComponent,
    canActivate: [LoginAuthService],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
