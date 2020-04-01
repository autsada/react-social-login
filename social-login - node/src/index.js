const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.post('/signin/facebook', async (req, res) => {
  console.log('Request -->', req.body.user)

  try {
    const response = await axios({
      method: 'get',
      url: `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=<YOUR_FACEBOOK_APP_ID>&client_secret=<YOUR_FACEBOOK_APP_SECRET>&fb_exchange_token=${req.body.user.accessToken}`
    })
    const result = response.data
    console.log('Result -->', result)

    // If (result) --> process signup (new user) / signin (exiting user)
  } catch (error) {}
})

app.listen(4000, () => console.log('Server started'))
