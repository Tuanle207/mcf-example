export const environment = {
  production: false,
  msalConfig: {
      auth: {
          clientId: '47612be8-c5ba-498b-b5c8-f4a913c02d6a',
      }
  },
  apiConfig: {
      scopes: [
        'https://wasoteam.onmicrosoft.com/dev/waso/wave/api/WAVE.Read',
        'https://wasoteam.onmicrosoft.com/dev/waso/wave/api/WAVE.Write'
      ],
      uri: 'http://localhost:5000'
  },
  b2cPolicies: {
      names: {
          signUpSignIn: "B2C_1_signupsigninflow",
          resetPassword: "B2C_1_passwordresetflow",
          editProfile: "B2C_1_profileeditflow"
      },
      authorities: {
          signUpSignIn: {
              authority: 'https://wasoteam.b2clogin.com/wasoteam.onmicrosoft.com/B2C_1_signupsigninflow'
          },
          resetPassword: {
              authority: 'https://wasoteam.b2clogin.com/wasoteam.onmicrosoft.com/B2C_1_passwordresetflow'
          },
          editProfile: {
              authority: "https://wasoteam.b2clogin.com/wasoteam.onmicrosoft.com/B2C_1_profileeditflow"
          }
      },
      authorityDomain: "wasoteam.b2clogin.com"
  }
};
