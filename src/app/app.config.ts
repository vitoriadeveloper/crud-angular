import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { provideNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';

registerLocaleData(localePt, 'pt-BR');
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideNgxMask(),
    provideAnimationsAsync(),
    provideToastr(),
  ],
};
