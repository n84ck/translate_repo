import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
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
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { localizeServerLoaderFactory } from './_services/localize-server.loader';
import { translateServerLoaderFactory } from './_services/translate-server.loader';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState],
      },
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: localizeServerLoaderFactory,
        deps: [
          TranslateService,
          Location,
          LocalizeRouterSettings,
          TransferState,
        ],
      },
      initialNavigation: true,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
