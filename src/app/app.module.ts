import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
  TransferState,
} from '@angular/platform-browser';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
} from '@gilsdav/ngx-translate-router';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { localizeBrowserLoaderFactory } from './_services/localize-browser.loader';
import { translateBrowserLoaderFactory } from './_services/translate-browser.loader';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserTransferStateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'hu',
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeBrowserLoaderFactory,
        deps: [
          TranslateService,
          Location,
          LocalizeRouterSettings,
          HttpClient,
          TransferState,
        ],
      },
      initialNavigation: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
