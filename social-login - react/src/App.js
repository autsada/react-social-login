import React from 'react'
import FacebookLogin from 'react-facebook-login'
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
    </div>
  )
}

export default App
