import axios from "axios"
import { getHashParams } from "../utils"

const setTokenDate = () => window.localStorage.setItem('spotify_token_timestamp', Date.now())
const setLocalAccessToken = token => {
    setTokenDate();
    window.localStorage.setItem('spotify_access_token', token)
}
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token)

const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token')
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token')
const getTokenDate = () => window.localStorage.getItem('spotify_token_timestamp')

const refreshAccessToken = async () => {
    try {
        const { data } = await axios.get(`http://localhost:8888/refresh_token?refresh_token=${getLocalRefreshToken()}`)
        const { access_token } = data
        setLocalAccessToken(access_token)
        window.location.reload()
        return
    } catch (e) {
        console.log(e);
    }
}

export const getAccessToken = () => {
    const { error, access_token, refresh_token} = getHashParams() //the url is not changing
    if (error) {
        console.log(error)
        refreshAccessToken()
    }

    if (Date.now() - getTokenDate() > 3600000) {
        console.warn("...Refreshing access token...")
        refreshAccessToken();
    }

    const localAccessToken = getLocalAccessToken()

    if ((!localAccessToken || localAccessToken === 'null') && access_token) {
        setLocalAccessToken(access_token)
        setLocalRefreshToken(refresh_token)
        return access_token
    }

    return localAccessToken
    
}

export const token = getAccessToken();

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
}

//export const getUser = () => axios.get('https://api.spotify.com/v1/me', {headers})

export const getTopArtists = () => axios.get('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=20', {headers})

//export const getArtist = (id) => axios.get(`https://api.spotify.com/v1/artists/${id}`, {headers})

export const getArtistAlbums = (artistId) => axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=10`, {headers})

export const getAlbumTracks = (albumId) => axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=20`, {headers})

export const getAudio = (trackId) => axios.get(`https://api.spotify.com/v1/audio-features/${trackId}}`, {headers})

export const getAllArtistAlbums = (artists) => 
    axios
    .all(artists.map(artist => getArtistAlbums(artist)))
    .then(
        axios.spread((...res) => ({res}))
    );
    
export const getAllTracks = (albums) =>
    axios.all(albums.map(album => getAlbumTracks(album)))
    .then(
        axios.spread((...res) => ({res}))
    );

export const getAllAudio = (tracks) =>
    axios.all(tracks.map(track => getAudio(track)))
    .then(
        axios.spread((...res) => ({res}))
    );

export const getMultipleAudio = (tracks) => axios.get(`https://api.spotify.com/v1/audio-features?ids=${tracks}}`, {headers})
