export const environment = {
  apiUrl: 'http://localhost:6061',
  auth0: {
    // TODO: Fill in from Auth0 Dashboard → Applications → map-viewer-app
    // Must use SAME Auth0 tenant as shell for SSO to work
    domain: 'PLACEHOLDER_AUTH0_DOMAIN',            // same domain as shell
    clientId: 'PLACEHOLDER_MAP_VIEWER_CLIENT_ID',  // different clientId from shell
    audience: 'PLACEHOLDER_API_AUDIENCE',          // same audience as shell
  },
};