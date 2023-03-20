import React from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';

const Callback = ({ code, error }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [tokenData, setTokenData] = React.useState(null);
  
  const client_id = '6df6b59cb94b4bfbb76803a2092a11ee';
  const client_secret = 'd4e56a8f3ba0415788089db89d49b931';
  const redirect_uri = 'http://localhost:3000/callback';

  const router = useRouter();

  // Define function to get new access token using refresh token
  const getAccessToken = async (refreshToken) => {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`
        },
        body: new URLSearchParams({
          'grant_type': 'refresh_token',
          'refresh_token': refreshToken
        })
      });

      const newTokenData = await response.json();
      const expiresAt = Date.now() + (newTokenData.expires_in * 1000);

      // Store new token data in state and localStorage
      setTokenData({
        ...newTokenData,
        expires_at: expiresAt
      });
      localStorage.setItem('spotify_token_data', JSON.stringify({
        ...newTokenData,
        expires_at: expiresAt
      }));
    } catch (error) {
      console.error('Error refreshing access token:', error.message);
    }
  };

  React.useEffect(() => {
    const getTokenData = async () => {
      if (error) {
        return;
      }

      try {
        setIsLoading(true);
        
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${client_id}:${client_secret}`)}`
          },
          body: new URLSearchParams({
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri,
            'client_id': client_id,
            'client_secret': client_secret
          })
        });

        const initialTokenData = await response.json();
        const expiresAt = Date.now() + (initialTokenData.expires_in * 1000);

        // Store token data in state and localStorage
        setTokenData({
          ...initialTokenData,
          expires_at: expiresAt
        });
        localStorage.setItem('spotify_token_data', JSON.stringify({
          ...initialTokenData,
          expires_at: expiresAt
        }));
        
        // Redirect to dashboard.js
        router.push({
          pathname: '/dashboard',
          query: { data: JSON.stringify(initialTokenData) },
        });

      } catch (error) {
        console.error('Error getting token data:', error.message);
      }
    };

    // Check if token data exists in localStorage and is not expired
    const storedTokenData = JSON.parse(localStorage.getItem('spotify_token_data'));
    if (storedTokenData && storedTokenData.expires_at > Date.now()) {
      setTokenData(storedTokenData);
      router.push({
        pathname: '/dashboard',
        query: { data: JSON.stringify(storedTokenData) },
      });
    } else {
      getTokenData();
    }
  }, [code, error, client_id, client_secret, redirect_uri,]); 

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return null;
};

Callback.getInitialProps = async ({ query }) => {
  const { code, error } = query;
  return { code, error };
};

export default Callback;
