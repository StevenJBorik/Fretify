import React from 'react';

// const client_id = process.env.CLIENT_ID;
// const client_secret = process.env.CLIENT_SECRET;
// const redirect_uri = 'http://localhost:3000/callback';

export const useIsLoading = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  return { isLoading, setIsLoading };
};

function Callback({ code, error, tokenData }) {
  const { isLoading, setIsLoading } = useIsLoading(); 
  const client_id = '6df6b59cb94b4bfbb76803a2092a11ee';
  const client_secret = 'd4e56a8f3ba0415788089db89d49b931';
  const redirect_uri = 'http://localhost:3000/callback';


  React.useEffect(() => {
    const getTokenData = async () => {
      if (error) {
        return;
      }
      
      try {
        const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
        setIsLoading(true);
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${auth}`,
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            // refresh_token: 'AQCo3Q7cbaKmzAT560VafFB0RlMtz3GF-VKEyYlKmcZQj0XFtd…dxMWDrazqQKwuzU6b9qOr7Xvw7g2HwDYm9o7RFnlhVNJ0Iljg', 
            code: code,
            redirect_uri: redirect_uri,
            client_id: client_id,   
            client_secret: client_secret
          }),
        });
        const tokenData = await response.json();
        setIsLoading(false);

        console.log('tokenData:', tokenData);
      } catch (error) {
        setIsLoading(false);
        console.error('Error getting token data:', error.message);
      }
    };

    getTokenData();
  }, [code, error, setIsLoading]);

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

  return (
    <div>
      <h1>Token Data</h1>
      <pre>{JSON.stringify(tokenData, null, 2)}</pre>
    </div>
  );
}

Callback.getInitialProps = async ({ query }) => {
  const { code, error } = query;
  return { code, error };
};

export default Callback;