import React from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

import './App.css'

function App() {
  const signUserIn = async response => {
    console.log('Res -->', response)
    const { name, email, accessToken, userID } = response
    const user = { name, email, accessToken, userId: userID }

    await axios({
      method: 'post',
      url: 'http://localhost:4000/signin/facebook',
      data: {
        user
      }
    })
  }

  const signinWithGoogle = async response => {
    console.log('Res -->', response)
    const {
      tokenObj: { access_token },
      profileObj: { googleId, email, name }
    } = response
    const user = { name, email, accessToken: access_token, userId: googleId }

    await axios({
      method: 'post',
      url: 'http://localhost:4000/signin/google',
      data: {
        user
      }
    })
  }

  return (
    <div className='App'>
      <div>
        <FacebookLogin
          appId='YOUR_FACEBOOK_APP_ID'
          fields='name,email'
          scope='public_profile, email'
          callback={signUserIn}
        />
      </div>
      <br />
      <br />
      <div>
        <GoogleLogin
          clientId='YOUR_GOOGLE_APP_ID'
          buttonText='LOGIN WITH GOOGLE'
          onSuccess={signinWithGoogle}
          onFailure={signinWithGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  )
}

export default App
