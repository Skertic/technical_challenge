import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideQueryClient, QueryClient } from '@ngneat/query';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { AppThemePreset } from './core/theme/app-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideQueryClient(() => new QueryClient()),
    providePrimeNG({
      theme: {
        preset: AppThemePreset,
        options: {
          darkModeSelector: false,
        },
      },
    }),
  ],
};
