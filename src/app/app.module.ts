import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// JeanMGirard App Modules
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'biscuitsetcreme'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
