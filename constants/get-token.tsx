const admin = require('firebase-admin');

export default function getAccessToken() {
  return admin.credential.applicationDefault().getAccessToken()
      .then(accessToken => {
        return accessToken.access_token;
      })
      .catch(err => {
        console.error('Unable to get access token');
        console.error(err);
      });
}