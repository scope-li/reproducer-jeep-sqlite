import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {SQLiteService} from "./sqlite.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: (sqLiteService: SQLiteService) => () => sqLiteService.initialize(),
      deps: [SQLiteService],
      multi: true,
    },
    SQLiteService,
  ],
};
