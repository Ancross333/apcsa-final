import React, { useState } from 'react';
import '../CSS/Login.css';

export default function Login( { setLogin, addUser, users, setUser } ) {

    //usState refs for username and password 
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function register(){
      
      //Ensure the user has entered a username

      if(username.length === 0){
        alert('Complete the missing fields')
        return
      }

      //Ensure the user chose a unique username

      for(let i = 0; i < users.length; i++){
        if(username === users[i].u){
          alert('Username already taken')
          return;
        }
      }

      //Ensure user meets password requirements

      if(password.length < 8){
        alert("Your password is too short")
        return;
      }

      //Define a new User given the fields

      const user = {
        u: username,
        p: password,
        newMessages: 0,
        contacts: [],
        messages: [{
          sender: "A mun gus",
          content: "This is a message sent longer than 25 characters"
        },
        {
          sender: "Among us",
          content: "This is a message received longer than 25 characters"
        }
        ],
        conversations: [],
      }

      //Add user and refresh inputs
      
      addUser(oldUsers => [...oldUsers, user])
      setPassword('')
      setUsername('')
      alert('Account Created')
    }

    function login(e){

      //Prevent Page Reload

      e.preventDefault()

      //Validate Login

      for(let i = 0; i < users.length; i++){
        if(username === users[i].u){
          if(password === users[i].p){
            setLogin(true);
            setUser(users[i])
            return
          }
          
          //Prompt User

          alert('Incorrect Password')
          return
        }

      }
      alert('Username does not exist')
    }

    //Visuals for login screen

  return (
    <div>

      <div className='formContainer'>
        <div className='formSpace'>
          <form onSubmit={login}>
            <div>
              <input value = {username} placeholder='Username' type='text' onChange={e => setUsername(e.target.value)} />
            </div>

            <div>
              <input value = {password} placeholder='Password' type='password' onChange = {e => setPassword(e.target.value)}  />
            </div>

            <div>  
              <input className='button' type= 'submit' value= 'Log in' />
              <input className='button' type= 'button' value= 'Register' onClick={register} />
              <div>
                <input className='button' type= 'button' value= 'Demo 1' onClick={() => {setUser(users[0]); setLogin(true); alert('Add user 2 as a contact on the left sidebar to create a conversation')}} />
                <input className='button' type= 'button' value= 'Demo 2' onClick={() => {setUser(users[1]); setLogin(true); alert('Add user 1 as a contact on the left sidebar to create a conversation')}} />
              </div>
            </div>
          </form>
        </div>
      </div>
        
        
    </div>
  )
}
