import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [SharedModule],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
