import { useState, useEffect } from 'react';
// import fetch from 'node-fetch';

const RefreshToken = (refresh_token) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const client_id = '6df6b59cb94b4bfbb76803a2092a11ee';
    const client_secret = 'd4e56a8f3ba0415788089db89d49b931';
    const refresh_token = 'AQAJTSM5udUqy00uCWw3ow79oQCEael6e3uJhTn8ziDTLIAA8DqFgMatmgch6WOtS1dNLMIidLaYQOnk9XsFiVliuSH5eZwhqBMkYosdvT4fBF7YyX2anXSKqSaLStrUum8';

    const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token
      })
    })
      .then(response => response.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error(error));
  }, [refresh_token]);

  return (
    <div>
      <h1>Refresh Token Example</h1>
      <p>Access Token: {accessToken}</p>
    </div>
  );
};

export default RefreshToken;
