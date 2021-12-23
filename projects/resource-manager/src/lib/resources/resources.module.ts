import { NgModule } from '@angular/core';
import { ResourcesComponent } from './resources/resources.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ResourcesComponent],
  imports: [SharedModule],
  exports: [ResourcesComponent],
})
export class ResourcesModule {}
