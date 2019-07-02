import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// JeanMGirard Core
import { environment } from '../environments/environment';
import { CoreModule } from '../core/core.module';
import { AuthService, AuthGuard } from '../core/auth/auth.service';
import { AuthModule } from '../core/auth/auth.module';

// JeanMGirard App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// @angular/fire/ Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Markdown modules
import { MarkdownModule } from 'ngx-markdown';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, environment.firebase.projectId),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,

    CoreModule,
    AuthModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
