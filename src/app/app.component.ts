import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  locales = this.localizeRouterService.parser.locales;
  currentUrl: {[key: string]: string} = {};
  constructor(
    private localizeRouterService: LocalizeRouterService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.setCurrentUrl();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setCurrentUrl();
      });
  }

  private setCurrentUrl(): void {
    const currentUrl = this.router.url
      .replace('/' + this.localizeRouterService.parser.currentLang, '')
      .split('?')[0]
      .replace(/^\//, '');
    const translations = this.translateService.translations[this.localizeRouterService.parser.currentLang];
    const route = Object.keys(translations).find(key => translations[key] === currentUrl);
    if (!route) {
      return;
    }
    for (const locale of this.localizeRouterService.parser.locales) {
      this.translateService.getTranslation(locale).subscribe(translation => {
        this.currentUrl[locale] = translation[route];
      })
    }
  }
}
