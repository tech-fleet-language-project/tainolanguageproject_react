const fetch = require('node-fetch');

async function addFirebase(projectId) {
  const accessToken = getAccessToken();
  const uri = 'https://firebase.googleapis.com/v1beta1/projects/' + projectId + ':addFirebase';
  const options = {
    method: 'GET',
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
  } catch(err) {
    console.error(err['message']);
  }
}