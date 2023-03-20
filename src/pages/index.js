import React from 'react';
import { useRouter } from 'next/router';
import RefreshToken from './refreshToken';

const client_id = '6df6b59cb94b4bfbb76803a2092a11ee'; 
const redirect_uri = 'http://localhost:3000/callback'; 
const refresh_token = 'AQAMLNKGjztrdyFuUYc53NJpUOHln8Iv0cPxx0hXxvO_5Nle2xjAm3yi0_9acYKUqqiUQugXT0agFxs6k9yObkZYSEH37S4gnSGSB5Bxm0IBitOsy15EW459REiGUI1dcgU';

export default function Index() {
  const [refreshToken, setRefreshToken] = React.useState('');
  const router = useRouter();

  const handleLogin = () => {
    const query = new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: 'app-remote-control user-read-email user-read-playback-state user-modify-playback-state streaming playlist-read-private user-library-read user-read-private user-read-email',
      // show_dialog: 'true'
    });
    router.push(`https://accounts.spotify.com/authorize?${query}`);
  };

  // const handleRefreshToken = () => {
  //   RefreshToken(refresh_token);
  // };

  const handleRefreshToken = () => {
    setRefreshToken(refresh_token);
  };

  return (
    <div>
      <h1>Spotify API Authorization Code Flow</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
      {refreshToken && <RefreshToken refresh_token={refreshToken} />}
      <h2>Refresh Token</h2>
      <button onClick={handleRefreshToken}>Refresh token</button>
    </div>
  );
}