import React,{useState} from 'react'
import styles from './AuthModal.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { verifyUser } from '../../api';

export default function Login() {
  const [user, setuser] = useState({
    email: "",
    password:""
  })
  const navigate = useNavigate();

  
  function handleChange(e){
    setuser({...user,[e.target.name]: e.target.value})
}

  async function handleSubmit(e) {
      e.preventDefault()
      let response = await verifyUser(user)
        if(response){
            sessionStorage.setItem("User", response)
            axios.defaults.headers.common["authorization"] = `Bearer ${response}`
            navigate('/home')
        }
        else{
            alert("Login Failed")
        }
        
  }
  return (
    <div>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        required
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <button
      type="submit"
      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Login
    </button>
  </form>
    </div>
  )
}
