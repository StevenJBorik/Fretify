import React from 'react';
import { useRouter } from "next/router"

const Dashboard = () => {
  const router = useRouter(); 
  const { tokenData } = router.query; 
  const [songQuery, setSongQuery] = React.useState('');
  const [playlistQuery, setPlaylistQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState(null);
  const [currentPlaylist, setCurrentPlaylist] = React.useState(null);
  const [currentPlaylistTracks, setCurrentPlaylistTracks] = React.useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);
//   const tokenData = JSON.parse(this.props.router.query.data);

  const handleSearch = async (e) => {
    
    e.preventDefault();
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${songQuery}&type=track`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      const data = await response.json();
      console.log(data); 
      setSearchResults(data.tracks.items);
    } catch (error) {
      console.error('Error searching for tracks:', error.message);
    }
  };

  const handlePlayTrack = async (track) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        },
        body: JSON.stringify({
          uris: [track.uri]
        })
      });

      if (response.ok) {
        setIsPlaying(true);
        setCurrentTrack(track);
      }
    } catch (error) {
      console.error('Error playing track:', error.message);
    }
  };

  const handlePauseTrack = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/pause`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      if (response.ok) {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error pausing track:', error.message);
    }
  };

  const handleSearchPlaylist = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${playlistQuery}&type=playlist`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      const data = await response.json();
      setSearchResults(data.playlists.items);
    } catch (error) {
      console.error('Error searching for playlists:', error.message);
    }
  };

  const handlePlayPlaylist = async (playlist) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      const data = await response.json();
      setCurrentPlaylist(playlist);
      setCurrentPlaylistTracks(data.items);
      setCurrentTrack(data.items[0].track);
      setCurrentTrackIndex(0);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing playlist:', error.message);
    }
  };

  const handleSkipTrack = async () => {
    if (currentTrackIndex + 1 >= currentPlaylistTracks.length) {
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/next`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      });

      if (response.ok) {
        const nextTrackIndex =currentTrackIndex + 1;
        setCurrentTrack(currentPlaylistTracks[nextTrackIndex].track);
        setCurrentTrackIndex(nextTrackIndex);
        }
        } 
        catch (error) {
            console.error('Error skipping track:', error.message);
        }
  };
        
  return (
        <div>
          <form onSubmit={handleSearch}>
            <label>
              Search for a song: 
              <input type="text" value={songQuery} onChange={(e) => setSongQuery(e.target.value)} />
            </label>
            <button type="submit">Search</button>
          </form>
          {searchResults.length > 0 && (
            <div>
            <h2>Song Results:</h2>
            <ul>
                {searchResults.map((track) => (
                <li key={track.id}>
                    {track.name} - {track.artists[0].name}{' '}
                    <button onClick={() => handlePlayTrack(track)}>Play</button>
                </li>
                ))}
            </ul>
            </div>
          )}

          <form onSubmit={handleSearchPlaylist}>
                <label>
                Search for a playlist:
                <input type="text" value={playlistQuery} onChange={(e) => setPlaylistQuery(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>

            {searchResults.length > 0 && (
                <div>
                <h2>Playlist Results:</h2>
                <ul>
                    {searchResults.map((playlist) => (
                    <li key={playlist.id}>
                        {playlist.name} - {playlist.owner.display_name}{' '}
                        <button onClick={() => handlePlayPlaylist(playlist)}>Play</button>
                    </li>
                    ))}
                </ul>
                </div>
            )}

        {currentPlaylist && (
            <div>
            <h2>Now Playing:</h2>
            <p>{currentTrack.name} - {currentTrack.artists[0].name}</p>
            <button onClick={handleSkipTrack}>Skip</button>
            {isPlaying ? (
                <button onClick={handlePauseTrack}>Pause</button>
            ) : (
                <button onClick={() => handlePlayTrack(currentTrack)}>Play</button>
            )}
            </div>
        )}
    </div>
  );
};
export default Dashboard;