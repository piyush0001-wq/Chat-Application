import './App.css';
import { auth, provider } from './firebase'
import ChatRoom from './Chatroom'

import { useAuthState } from 'react-firebase-hooks/auth';

function App() {


  const [user] = useAuthState(auth);


  function signinHandler() {
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error)
      });
  }



  return (
    <div className="App">
      {
        user ?
          <div className="chatroom">
            <div className="header" >
              <h2>i Chat</h2>
              <p>Hey! This is new community for those who like to talk to different people.</p>
              <button onClick={() => auth.signOut()}>Logout</button>
            </div>
            <ChatRoom auth={auth} />
          </div> :
          <div className="signIn">
            <h3>i Chat</h3>
            <button onClick={signinHandler}>Sign in with Google</button>
            <p>Do not violate the community guidelines or you will be banned for life!</p>
          </div>
      }
    </div>
  );
}

export default App;
