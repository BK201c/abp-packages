import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Auth',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44364/',
    redirectUri: baseUrl,
    clientId: 'Auth_App',
    responseType: 'code',
    scope: 'offline_access Auth',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44364',
      rootNamespace: 'Robo.System.Auth',
    },
  },
} as Environment;
