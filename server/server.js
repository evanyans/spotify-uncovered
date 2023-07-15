if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
var REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:5173';

const express = require('express')
const path = require('path')
const request = require('request')

const querystring = require('querystring')



const generateRandomString = function(length) {
    var text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

const stateKey = 'spotify_auth_state';

const app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read playlist-read-private playlist-read-collaborative';
    
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state
    }));
})

app.get('/callback', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect(`/#${querystring.stringify({error: 'state_mismatch'})}`);
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
              'base64',
            )}`,
          },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token
            const refresh_token = body.refresh_token

            // we can also pass the token to the browser to make requests from there
            res.redirect(`/#${querystring.stringify({access_token: access_token,refresh_token: refresh_token})}`);
        } else {
            res.redirect(`/#${querystring.stringify({error: 'invalid_token'})}`);
        }
      });
    }
  });

  app.get('/refresh_token', function(req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token
        },
        json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({access_token});
      }
    });
  });
  

const port = process.env.PORT || 5173;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
