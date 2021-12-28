import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'elso',
    loadChildren: () =>
      import('./features/feature-one/feature-one.module').then(
        (m) => m.FeatureOneModule
      ),
  },
  {
    path: 'masodik',
    loadChildren: () =>
      import('./features/feature-two/feature-two.module').then(
        (m) => m.FeatureTwoModule
      ),
  },
  { path: '', redirectTo: '/elso', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
