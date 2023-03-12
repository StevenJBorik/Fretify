import React from 'react';
import Router from 'next/router';

const Callback = ({ code, error }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const client_id = '6df6b59cb94b4bfbb76803a2092a11ee';
  const client_secret = 'd4e56a8f3ba0415788089db89d49b931';
  const redirect_uri = 'http://localhost:3000/callback';
  
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

        const tokenData = await response.json();
        console.log(tokenData);

        // Redirect to dashboard.js
        Router.push({
          pathname: '/dashboard',
          query: { tokenData: JSON.stringify(tokenData) } 
        });

      } catch (error) {
        console.error('Error getting token data:', error.message);
      }
    };

    getTokenData();
  }, [code, error, client_id, client_secret, redirect_uri]);

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