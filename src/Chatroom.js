import React from 'react'
import firebase from 'firebase'
import { useState, useEffect } from 'react'
import db from './firebase'
import './chatRoom.css'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'

function Chatroom({ auth }) {

  const [messagess, setMessagess] = useState([]);
  const [formValue, setFormValue] = useState('');
  const [status, setStatus] = useState(true)
  const [recordState, setrecordState] = useState(null)
  const [voiceUrl, setvoiceUrl] = useState('')

  useEffect(() => {
    db.collection('messagess').orderBy('createdAt', 'asc').onSnapshot(snapshot => {
      setMessagess(snapshot.docs.map(doc => ({
        id: doc.id,
        message: doc.data().text,
        photoURL: doc.data().photoURL,
        uid: doc.data().uid,
        username: doc.data().username,
        likes: doc.data().likes,

      })))
    })
  }, [])

  function sendMessage(e) {
    e.preventDefault();
    db.collection('messagess').add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
      username: auth.currentUser.displayName,
      likes: 2
    })
    setFormValue('')
  }

  function statusHandler() {
    setStatus(!status)
  }

  function startRecording() {
    setrecordState(RecordState.START)
  }
  function stopRecording() {
    setrecordState(RecordState.STOP)
  }

  function onStop(audioData) {
    setvoiceUrl(audioData.url)

    db.collection('voice_message').add({
      voice_note: audioData.url
    })
  }


  return (
    <div className="chatroom_container">
      <div className="left">

        <div className="card">
          <p className="set_status" onClick={statusHandler}>{status ? 'go offline' : 'go online'}</p>
          <img src={auth.currentUser.photoURL} alt="hh" className={status ? 'status_online' : 'status_offline'} />
          <div className="content">
            <h3>{auth.currentUser.displayName}</h3>
            <p><i class="fas fa-microphone-slash"></i></p>
            <p><i class="fas fa-headset"></i></p>
            <p><i class="fas fa-cog"></i></p>
          </div>
        </div>

        <div className="recording">
          <a href={voiceUrl} rel="noreferrer" target="_blank" >{voiceUrl}</a>

          <div className="buttons">
            <p ><i onClick={startRecording} class="fas fa-microphone"></i></p>
            <p ><i onClick={stopRecording} class="fas fa-share"></i></p>
          </div>

          <AudioReactRecorder className="audio-react-recorder " state={recordState} onStop={onStop} />
        </div>

      </div>

      <div className="messagess">
        {
          messagess && messagess.map(msg => (
            <div className={auth.currentUser.uid === msg.uid ? "loggedUSerMessage" : "message"} >
              <img src={msg.uid === auth.currentUser.uid ? auth.currentUser.photoURL : msg.photoURL} alt="user" />
              <div className="nameandtext">
                <p className="username">{msg.username === auth.currentUser.displayName ? " " : msg.username}</p>
                <div className="texts">

                  <p className="usertext" >{msg.message}</p>

                </div>
              </div>
            </div>
          ))
        }

        <form className="msg_form" onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice..." />
          <button type="submit" disabled={!formValue}>Send</button>
        </form>

      </div>

      <div className="right">
        <h3>Active Now</h3>
        <div className="content">
          <h2>It's quite for now...</h2>
          <p>When a friend starts an activity -
          like playing a game or hanging out on voice - we'll show it here!</p>
        </div>
      </div>

    </div>
  )
}

export default Chatroom
