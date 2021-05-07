import React from 'react'
import { useState } from 'react'
import { auth, provider } from '../firebase'

function SignIn() {

  function signinHandler() {
    function handleAuth() {
      auth.signInWithPopup(provider)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }
  return (
    <div>
      <button onClick={signinHandler}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </div>
  )
}

export default SignIn
