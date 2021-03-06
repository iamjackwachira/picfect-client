import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment, appRouterProviders } from './app/';
import {HTTP_PROVIDERS} from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { HomeService } from './app/home/home.service';
import {IMAGELAZYLOAD_PROVIDERS} from 'ng2-image-lazy-load/ng2-image-lazy-load';
import {ToastyService, ToastyConfig} from 'ng2-toasty/ng2-toasty';
import {FacebookService} from 'ng2-facebook-sdk/dist/index';


if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS, AUTH_PROVIDERS, appRouterProviders, HomeService, IMAGELAZYLOAD_PROVIDERS, ToastyService, ToastyConfig, FacebookService]);

