import React, { useState, useRef } from 'react'
import '../CSS/Dashboard.css'
import MessageCenter from './MessageCenter'
import Sidebar from './Sidebar'


export default function Dashboard({ messages, setMessages, setLogin, currentUser, userList, conversations, setConversations }) {

    //useState ref for active conversation

    const [activeConversation, setActiveConversation] = useState([])

    //Logout Function

    function logOut(){
        setLogin(false)
    }

    //Function to create a conversation 

    function addConversation(user1, user2){

      //Create new conversation object
  
      const newConversation = {
        u1: user1.u,
        u2: user2,
        messages: []
      }
  
      //Add new conversation to the conversation list
  
      setConversations(oldConversations => [...oldConversations, newConversation])
      alert("Conversation created. Click on the contact again to view it.")
    }

    //Visuals for Dashboard
    
  return (
    <div className='dashContainer'>

        <div className='dashHead'>
          <h1>
            Hi {currentUser.u}, 
            {
              //Check to see how the user should be greeted at the top
              
              activeConversation.u1?
              currentUser.u === activeConversation.u1? 
              " you are talking with " + activeConversation.u2 :
              " you are talking with " + activeConversation.u1 :
              " you are talking with everybody"
            }
          </h1>
        </div>

        <div className='mainContentContainer'>
          <div className='sideBar'>
            <Sidebar conversations={conversations} addConversation = {addConversation} currentUser={currentUser} contacts={currentUser.contacts} users = {userList} activeConversation = {activeConversation} setActiveConversation = {setActiveConversation}/>
          </div>

          <div className='messageCenter'>
            <MessageCenter activeConversation={activeConversation} setConversations={setConversations} conversations={conversations} setMessages={setMessages} bigMessages={messages} currentUser={currentUser} />
          </div>
        </div>
        

        <div className='buttonGridMap'>
          <div className='buttonContainer'>
            <button className='button' onClick={logOut}>
              Sign Out
            </button>

          </div>
        </div>
        
        
        
    </div>

    
  )
}
