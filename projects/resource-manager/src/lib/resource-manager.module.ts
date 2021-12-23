import { NgModule } from '@angular/core';
import { ResourceManagerComponent } from './resource-manager.component';
import { ProjectsModule } from './projects/projects.module';
import { ResourcesModule } from './resources/resources.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [ResourceManagerComponent],
  imports: [ProjectsModule, ResourcesModule, SharedModule],
  exports: [ResourceManagerComponent],
})
export class ResourceManagerModule {}
