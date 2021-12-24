import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ResourceManagerModule } from 'resource-manager';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ResourceComponent } from './resource/resource.component';
import { ProjectComponent } from './project/project.component';
import { ContentComponent } from './content/content.component';
import { RegisterComponent } from './register/register.component';
import { InterceptorService } from './services/login/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ResourceComponent,
    ProjectComponent,
    ContentComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    ResourceManagerModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
