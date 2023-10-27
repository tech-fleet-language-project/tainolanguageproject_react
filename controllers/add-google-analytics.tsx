import getAccessToken from './get-token';
import { PROJECT_ID } from '@/constants/Firebase';


const fetch = require('node-fetch');

async function addGoogleAnalytics(PROJECT_ID, analyticsAccountId) {
  const accessToken = getAccessToken();
  const uri = 'https://firebase.googleapis.com/v1beta1/projects/' + PROJECT_ID + ':addGoogleAnalytics';
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
    // TODO: find analyticsAccountId
    body: JSON.stringify({
      'analyticsAccountId': analyticsAccountId
    }),
  };

  try {
    const rawResponse = await fetch(uri, options);
    const resp = await rawResponse.json();
    console.log(resp);
  } catch(error) {
    console.error(error);
  }
}