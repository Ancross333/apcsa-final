import React, { useState } from 'react'
import '../CSS/MessageCenter.css';

export default function MessageCenter({currentUser, bigMessages, setMessages, conversations, setConversations, activeConversation}) {
  
  //Assign a conversation 

  let mes;

  /*Condition to check to see if an indvidual conversation
    or the global conversation should be shown
  */

  if(activeConversation.length !== 0){
    mes = activeConversation.messages
  }
  else{
    mes = bigMessages
  }
  const messages = mes
  
  //useState ref for message input and active conversations

  const [messageInput, setMessageInput] = useState('')

  //Function to check if the message was sent by one of the users concts

  function checkContact(message){
    for(let i = 0; i < currentUser.contacts.length; i++){
      if(message.sender === currentUser.contacts[i].u){
        return true;
      }
    }
    console.log(false);
    return false;
  }

  //Function to send message

  function sendMessage(){
    
    console.log(activeConversation)
    //Prevent blank messages from sending
    
    if(messageInput.length === 0){
      return;
    }

    //Create new message

    const message = {
      sender: currentUser.u,
      content: messageInput,
    }

    //Append new message to messages array

    messages.push(message)

    //Clear message input

    setMessageInput('');

    //Scroll to bottom of messages

    const messageScreen = document.getElementById('messages')
    messageScreen.scrollTop = messageScreen.scrollHeight

  }

  //Function to send message off enter button

  function sendMessageEnter(e){
    if(e.key === 'Enter' && messageInput.length !== 0){
      sendMessage();
    }
  }

  //Visuals for the page

  return (

    
    <div className='messageContainer'>
      
      <div id = 'messages' className='messages'>
      
      
      {
        //Display messages if possible

        messages.length !== 0?
        
        //Iterate through messages array to display all of them on screen

        messages.map(message => (
          
          //Check to see what style of message to use

          message.sender === currentUser.u?
          
          <div className='sgrid'> 
            <div className='sentMessage'>
                <p>
                {message.content}
                </p>
            </div>
          </div>
          :
          <div className='rgrid'> 
            <div className={checkContact(message) ? 'contactMessage' : 'receivedMessage'}>
                <p>
                {message.content}
                <br></br>
                <br></br>
                {mes === bigMessages? "Sent by: " + message.sender : null}
                </p>
            </div>
          </div>
        )) : null
      }
      
      </div>
      
      <div className='messageInput'>
        <input className='textInput' value={messageInput} placeholder='Send a message' type='text' onChange={e => setMessageInput(e.target.value)} onKeyDown={sendMessageEnter}/>
        <input  type='button' className='button buttonInput' value={'Send'} onClick = {sendMessage}/>
      </div>
    </div>
  )
}
