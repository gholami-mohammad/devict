import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SecHeadersInterceptor } from './services/sec-headers.interceptor';
import { WordIndexComponent } from './components/word-index/word-index.component';
import { HomeComponent } from './components/home/home.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { WordFormComponent } from './components/word-form/word-form.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorHandlerService } from './services/error-handler.service';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { TranslationFormComponent } from './components/translation-form/translation-form.component';
import { TranslationIndexComponent } from './components/translation-index/translation-index.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { GoogleTranslatorComponent } from './components/google-translator/google-translator.component';
import { ReviewIndexComponent } from './components/review-index/review-index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PaginationComponent,
    LoadingComponent,
    WordIndexComponent,
    WordFormComponent,
    TranslationFormComponent,
    TranslationIndexComponent,
    GoogleTranslatorComponent,
    ReviewIndexComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SimpleModalModule.forRoot({ container: 'modal-container'}, {
      closeOnEscape: true,
      closeOnClickOutside: false,
      wrapperDefaultClasses: 'modal',
      wrapperClass: 'o-modal',
      animationDuration: 300,
      autoFocus: true,
      bodyClass: 'modal-body',
      draggable: false,
      draggableClass: '',
    }),
    ToastNoAnimationModule.forRoot(),
    AppRoutingModule,
    NgSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecHeadersInterceptor,
      multi: true,
    },
    ErrorHandlerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
