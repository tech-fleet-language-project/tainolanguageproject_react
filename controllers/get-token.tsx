const admin = require('firebase-admin');

export default function getAccessToken() {
  return admin.credential.applicationDefault().getAccessToken()
      .then(accessToken => {
        return accessToken.access_token;
      })
      .catch(error => {
        console.error('Unable to get access token');
        console.error(error);
      });
}