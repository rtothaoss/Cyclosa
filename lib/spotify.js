var angerURI = ['spotify:track:2jJIxT6WAIVWzDo3Ou53Q0', 'spotify:track:7gKRFJczQq5sGIJTJIaH8E','spotify:track:5bJ1DrEM4hNCafcDd1oxHx']
var spotifyURI = 0;


// var albumImage = 0;
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQD3mgWWnkqIHm3JZ77HyQjueDrUFd5s7Tdybzcw6w5No0kiljdUSUv6KwQNu5mVw8_tDXK15ye_BnQcaO7FMg--5r92CocfglxG6aed9tlVIV4fpSID5j9BI1uNnTm6ctjJRIvJ2lpW4A2eb6X-uhqEXqugJSwp6MBY2FC6JSlZcGTMfcVw1y-ijX9w';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
    });

    
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    // player.addListener('player_state_changed', state => { console.log(state); });


    // Ready
    player.addListener('ready', ({ device_id }) => {
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: spotifyURI }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }).then(function(response){
        metaData();
        // player.getCurrentState().then(state => {
        //     if (!state) {
        //         console.error('User is not playing music through the Web Playback SDK');
        //         return;
        //     }

        //     let {
        //         current_track,
        //         next_tracks: [next_track]
        //     } = state.track_window;

        //     console.log('Currently Playing', current_track);
        //     console.log('Playing Next', next_track);
        //     var albumImage = state.track_window.current_track.album.images[0].url;
        //     var albumImageTag = $('<img>');
        //     albumImageTag.attr('src', albumImage);
        //     $('#albumImageDiv').append(albumImageTag);

        //     var albumTitle = state.track_window.current_track.album.name;
        //     var albumTitlePTag = $('<p>').text('Album Title: ' + albumTitle);
        //     $('#albumTitle').append(albumTitlePTag);

        //     var artistName = state.track_window.current_track.artists[0].name;
        //     var artistNameHTag = $('<h3>').text('Artist: ' + artistName);
        //     $('#artist').append(artistNameHTag);

        //     var songTitle = state.track_window.current_track.name;
        //     var songTitlePTag = $('<p>').text('Song Title: ' + songTitle);
        //     $('#songTitle').append(songTitlePTag);
        //     console.log(response);
        // });
    
        })

        console.log('Ready with Device ID', device_id);

    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    // player.connect();
    
    function metaData() {
        player.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            let {
                current_track,
                next_tracks: [next_track]
            } = state.track_window;

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
            var albumImage = state.track_window.current_track.album.images[0].url;
            var albumImageTag = $('<img>');
            albumImageTag.attr('src', albumImage);
            $('#albumImageDiv').append(albumImageTag);

            var albumTitle = state.track_window.current_track.album.name;
            var albumTitlePTag = $('<p>').text('Album Title: ' + albumTitle);
            $('#albumTitle').append(albumTitlePTag);

            var artistName = state.track_window.current_track.artists[0].name;
            var artistNameHTag = $('<h3>').text('Artist: ' + artistName);
            $('#artist').append(artistNameHTag);

            var songTitle = state.track_window.current_track.name;
            var songTitlePTag = $('<p>').text('Song Title: ' + songTitle);
            $('#songTitle').append(songTitlePTag);
        });
    };

    function metaDataNext() {
        player.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }

            let {
                current_track,
                next_tracks: [next_track]
            } = state.track_window;

            console.log('Currently Playing', current_track);
            console.log('Playing Next', next_track);
            var albumImage = state.track_window.next_tracks[0].album.images[0].url;
            var albumImageTag = $('<img>');
            albumImageTag.attr('src', albumImage);
            $('#albumImageDiv').append(albumImageTag);

            var albumTitle = state.track_window.next_tracks[0].album.name;
            var albumTitlePTag = $('<p>').text('Album Title: ' + albumTitle);
            $('#albumTitle').append(albumTitlePTag);

            var artistName = state.track_window.next_tracks[0].artists[0].name;
            var artistNameHTag = $('<h3>').text('Artist: ' + artistName);
            $('#artist').append(artistNameHTag);

            var songTitle = state.track_window.next_tracks[0].name;
            var songTitlePTag = $('<p>').text('Song Title: ' + songTitle);
            $('#songTitle').append(songTitlePTag);
        });
    };
    

    
        function emptyTheDom() {
            $('#albumImageDiv').empty();
            $('#artist').empty();
            $('#songTitle').empty();
            $('#songTitle').empty();
            $('#albumTitle').empty();
        }



    $('#play').on('click', function () {
        player.connect();
        // event.preventDefault();
        player.togglePlay().then(() => {
            console.log('Resumed!');
        });
    })
    $('#next').on('click', function () {
        // event.preventDefault();
        player.nextTrack().then(() => {
            console.log('Skipped to next track!');
            emptyTheDom();
            metaDataNext();
        });
    });

};