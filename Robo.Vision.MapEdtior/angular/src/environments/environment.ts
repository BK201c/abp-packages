import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'MapEditor',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'http://localhost:44319/',
    redirectUri: baseUrl,
    clientId: 'MapEditor_App',
    responseType: 'code',
    scope: 'offline_access MapEditor',
    requireHttps: false,
  },
  apis: {
    default: {
      url: 'http://localhost:44383',
      rootNamespace: 'Robo.Vision.MapEditor',
    },
  },
} as Environment;
