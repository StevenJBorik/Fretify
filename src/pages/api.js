// utils/api.js
const client_id = '6df6b59cb94b4bfbb76803a2092a11ee';
const client_secret = 'd4e56a8f3ba0415788089db89d49b931';
const redirect_uri = 'http://localhost:3000/dashboard'

export const getAccessToken = async (code, redirect_uri) => {
  try {
    console.log(code);
    console.log(redirect_uri);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`
      },
      body: new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': redirect_uri
      })
    });

    const tokenData = await response.json();
    const expiresAt = Date.now() + (tokenData.expires_in * 1000);

    return {
      ...tokenData,
      expires_at: expiresAt
    };

  } catch (error) {
    console.error('Error getting token data:', error.message);
    return null;
  }
};