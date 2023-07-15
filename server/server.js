if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express()

app.post('/login', (req, res) => {
    const spotifyApi = new SpotifyWebApi({
        redirectUri: ''
    })
})
