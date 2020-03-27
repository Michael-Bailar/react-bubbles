import React, { useState } from "react"
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = props => {

  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleChange = e => {

    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubble-page')
      })
      .catch(err => console.log(err))
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='username'
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log In</button>
        </form>
      </div>
    </>
  );
};

export default Login
