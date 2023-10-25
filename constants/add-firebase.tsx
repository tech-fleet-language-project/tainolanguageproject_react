import { PROJECT_ID } from './Firebase';

const fetch = require('node-fetch');

async function addFirebase(PROJECT_ID: string) {
  const accessToken = getAccessToken();
  const uri = 'https://firebase.googleapis.com/v1beta1/projects/' + PROJECT_ID + ':addFirebase';
  const options = {
    method: 'POST',
    // use a manual access token here since explicit user access token is required.
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  };

  try {
    const rawResponse = await fetch(uri, options);
    const resp = await rawResponse.json();
// log response and error in database
    console.log(resp);
  } catch(e) {
    console.error(e.message);
  }
}