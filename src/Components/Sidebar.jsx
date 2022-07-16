//imports

import React, { useState } from 'react'
import '../CSS/Sidebar.css';

export default function Sidebar( {conversations, addConversation, currentUser, contacts, users, activeConversation, setActiveConversation}) {

    //useState ref for user input
    
    const [userInput, setUserInput] = useState('')

    //Function to change the conversation

    function setConversation(e){

        //Iterate through every converation that exists

        for(let i = 0; i < conversations.length; i++){

            //Check for username matches

            if(conversations[i].u1 === currentUser.u){
                if(conversations[i].u2 === e.target.textContent){
                    setActiveConversation(conversations[i])
                    console.log(conversations[i])
                    return;
                }
            }

            //Check for username matches

            if(conversations[i].u2 === currentUser.u){
                if(conversations[i].u1 === e.target.textContent){
                    console.log(conversations[i])
                    setActiveConversation(conversations[i])
                    return;
                }
            }
        }

        /*Create a new conversation if one doesn't aready
          exist between two users. */
          
        addConversation(currentUser, e.target.textContent);
    }

    //Function to add a contact

    function addContact(index){
        contacts.unshift(users[index])
        setUserInput('')
    }

    //Function to find the index of a specific user

    function findIndex(usernameInput){
        
        //Ensure user input isn't their own username

        if(usernameInput === currentUser.u){
            alert('You cannot add yourself as a contact')
            return
        }

        //Ensure there are no dupe contacts

        for(let i = 0; i < contacts.length; i++){
            if(contacts[i].u === usernameInput){
                alert('You already added this person as a contact')
                return
            }
        }

        //Add a contact 

        for(let i = 0; i < users.length; i++){
            if(users[i].u === usernameInput){
                addContact(i);
                return
            }
        }

        //Prompt user that their input doesn't match an existing username
        
        alert('The entered username does not exist')
    }

  return (
    <div className='sideBarContainer'>
        <div className='sideBarHeader'>
            <h1>
                Contacts:
            </h1>
            
        
            {

            //Check to make sure contacts exist

            contacts.length !== 0?
                
            //Display all contacts

                contacts.map(contact => (
                    <p onClick={e => setConversation(e)} key = {contact.u} className='contact'>{contact.u}</p>
                ))
              
                
            //Display no contacts

            : <p>You have no contacts</p>
            }
            
            
            <input value={userInput} type='text' onChange={e => setUserInput(e.target.value)}/>
            <button className='button' onClick={() => findIndex(userInput)}>
                Add Contact
            </button>
        </div>
    </div>
  )
}
