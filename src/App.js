import React, { useState } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';


function App() {

  //useState refs for everything in the database

  const [loggedIn, setLoggedIn] = useState(false);
  const [users, addUsers] = useState(() => {
    return [{
        u: "User1",
        newMessages: 0,
        contacts: [],
        messages: [],
        conversations: [],
    },
    {
      u: "User2",
        newMessages: 0,
        contacts: [],
        messages: [],
        conversations: [],
    }
  ]
  })
  const [currentUser, setCurrentUser] = useState();
  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])

  return (
    <div className="App">

      {loggedIn? <Dashboard setConversations={setConversations} conversations={conversations} setMessages={setMessages} messages={messages} userList={users} setLogin={setLoggedIn} currentUser = {currentUser}/> : <Login setLogin = { setLoggedIn } addUser = { addUsers } users = {users} setUser = {setCurrentUser} /> }
      
    </div>
  );
}

export default App;
