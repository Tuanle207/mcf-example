export const environment = {
  apiUrl: 'http://localhost:5051',
  b2c: {
    // Azure B2C tenant — policy must have Auth0 configured as external Identity Provider
    clientId: '47612be8-c5ba-498b-b5c8-f4a913c02d6a',
    authority: 'https://wasoteam.b2clogin.com/wasoteam.onmicrosoft.com/B2C_1_signupsigninflow',
    knownAuthority: 'wasoteam.b2clogin.com',
    scopes: [
      'https://wasoteam.onmicrosoft.com/dev/waso/wave/api/WAVE.Read',
      'https://wasoteam.onmicrosoft.com/dev/waso/wave/api/WAVE.Write',
    ],
  },
};