import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthService } from './Services/AuthServices/auth.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withFetch()), {
      provide: 'APP_INITIALIZER',
      useFactory: (authServcie: AuthService) => {
        authServcie.validateToken();
      },
      deps: [AuthService],
      multi: true,
    }

  ]
};


export const config = mergeApplicationConfig(appConfig, serverConfig);