var spotifyEmotionURIS = {
    anger: ['spotify:track:0bxUaSy4x46Ogeio8khuBd', 'spotify:track:501CSzS4gwNOJnlWHuBt9r', 'spotify:track:4Yx9Tw9dTgQ8eGCq3PRDyn'],
    contempt: ['spotify:track:2zLZuZFgf4mn3af8wILpHS', 'spotify:track:77M6K5cvQvLW0yxsbbAZsI', 'spotify:track:2w8cJaVndSM5hPTiCzpQ0b'],
    disgusted: ['spotify:track:2G7V7zsVDxg1yRsu7Ew9RJ', 'spotify:track:7vGuf3Y35N4wmASOKLUVVU', 'spotify:track:41zXlQxzTi6cGAjpOXyLYH'],
    fear: ['spotify:track:77UuboVRygI3c6d4KKgSmW', 'spotify:track:4NG7kpINRtrV2chsHBLJlk', 'spotify:track:3MdaTfMFo5JwNaHgUO5CH6'],
    neutral: ['spotify:track:0X7rrzflUKygU7ROPBvRKM', 'spotify:track:1ymAaZIlmyCYf1f5zAI7JH', 'spotify:track:2jTidefcsTu6VQhpIImJrt'],
    sadness: ['spotify:track:5p7GiBZNL1afJJDUrOA6C8', 'spotify:track:1bfl5j92gs0wVMdi2A85NM', 'spotify:track:3EPXxR3ImUwfayaurPi3cm'],
    surprise: ['spotify:track:2oTDOIAdsxPTE7yAp4YOcv', 'spotify:track:1B75hgRqe7A4fwee3g3Wmu', 'spotify:track:7iMDaY1LnASwCk2uUpMtii'],
    happiness: ['spotify:track:2dxjKgT0li4qBI3QwuN9Ih', 'spotify:track:2dCTcN5w3VJko61tVBUfRG', 'spotify:track:4v0CuFW0bEMBQ1gRn2mB3X']
}


var device_id
const token = 'BQDgfO07I1ksJ4cUerU50qLkoZ7FQje8U2xq1pVMT27rquLIVWODHiQjkVjn7c9BDGqHSXkB1ghEU1n9nxDuuHzKpBQk94eAssePSGHSEeihJVcmlhLQQwp2hto1YP0da2rdpoNygW_dJ4jN8Xp-_v07O62BPDBv0OzY2BdOP1jhLEnXZ-TjXQRljh4g';


function playPlaylist(spotifyEmotion) {
    console.log(device_id)

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: spotifyEmotionURIS[spotifyEmotion] }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

    }).then(function (response) {
        metaData();
        // player.connect().then(function () {
        player.pause().then()
        // });
    });
};

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
    // player.connect();
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



// var albumImage = 0;
window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('onSpotifyWebPlaybackSDKReady')
    player = new Spotify.Player({

        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
    });
    player.addListener('ready', ({ device_id }) => {
        window.device_id = device_id;
        console.log(device_id)
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
    player.connect();
    // Playback status updates
    // player.addListener('player_state_changed', state => { console.log(state); });


    // Ready

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







    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!


}
