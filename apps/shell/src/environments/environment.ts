export const environment = {
  production: false,
  auth0: {
    // TODO: Fill in from Auth0 Dashboard → Applications → shell-app
    domain: 'PLACEHOLDER_AUTH0_DOMAIN',        // e.g. 'myorg.auth0.com'
    clientId: 'PLACEHOLDER_SHELL_CLIENT_ID',   // e.g. 'abc123'
    audience: 'PLACEHOLDER_API_AUDIENCE',      // e.g. 'https://api.myapp.com'
    redirectUri: 'http://localhost:4000',
  },
  apiConfig: {
    uri: 'http://localhost:6061'
  },
  b2cPolicies: {
    names: {
      signUpSignIn: 'B2C_1_signupsigninflow',
    },
    authorities: {
      signUpSignIn: {
        authority: 'https://wasoteam.b2clogin.com/wasoteam.onmicrosoft.com/B2C_1_signupsigninflow'
      },
    },
    authorityDomain: 'wasoteam.b2clogin.com'
  }
};
