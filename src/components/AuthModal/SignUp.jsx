import React,{useState} from 'react'
import styles from './AuthModal.module.css';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createUser } from '../../api';


export default function SignUp() {
  const [User, setUser] = useState({
    name : "",
    email:"",
    password : ""
  })
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({...User,[e.target.name]:e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault()
    let response = await createUser(User)
    console.log(response);
    if (response.status !== 200){
      alert("User account could not be created :(");
   }
    else{
      console.log(response);
    }
}
  return (
    <div>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        required
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
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
      SignUP
    </button>
  </form>
</div>
  )
}
