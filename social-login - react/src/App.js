import React, { useEffect } from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

import './App.css'

function App() {
  useEffect(() => {
    if ((window.location.hash = '/#_=_')) {
      window.location.hash = ''
    }
  })
  const signUserIn = async (response) => {
    console.log('Res -->', response)
    const { name, email, accessToken, userID } = response
    const user = { name, email, accessToken, userId: userID }

    await axios({
      method: 'post',
      url: 'http://localhost:4000/signin/facebook',
      data: {
        user,
      },
    })
  }

  const signinWithGoogle = async (response) => {
    console.log('Res -->', response)
    const {
      tokenObj: { access_token },
      profileObj: { googleId, email, name },
    } = response
    const user = { name, email, accessToken: access_token, userId: googleId }

    await axios({
      method: 'post',
      url: 'http://localhost:4000/signin/google',
      data: {
        user,
      },
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

      <br />
      <br />

      <div>
        <button
          style={{
            background: 'blue',
            fontSize: '18px',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '10px 20px',
          }}
        >
          <a
            style={{ color: 'white', textDecoration: 'none' }}
            href='http://localhost:4000/auth/facebook'
          >
            Login with Facebook
          </a>
        </button>
      </div>
    </div>
  )
}

export default App
