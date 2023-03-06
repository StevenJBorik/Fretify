import { useRouter } from 'next/router';

const client_id = process.env.CLIENT_ID; 
const redirect_uri = 'http://localhost:3000/callback'; 

export default function Index() {
  const router = useRouter();

  const handleLogin = () => {
    const query = new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: 'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming playlist-read-private user-library-read user-read-private user-read-email',
    });
    router.push(`https://accounts.spotify.com/authorize?${query}`);
  };

  return (
    <div>
      <h1>Spotify API Authorization Code Flow</h1>
      <button onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
}