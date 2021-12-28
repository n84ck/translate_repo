import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  locales = this.localizeRouterService.parser.locales;
  currentUrl = '';
  constructor(
    private localizeRouterService: LocalizeRouterService,
    private router: Router
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
    this.currentUrl = this.router.url
      .replace('/' + this.localizeRouterService.parser.currentLang, '')
      .split('?')[0];
  }
}
