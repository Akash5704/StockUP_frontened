import React,{useState} from 'react'
import styles from './AuthModal.module.css';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [email,setEmail]  = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate();
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3001/register',{email,password})
    .then(result => 
        {console.log(result)
          navigate('/welcome')
        }

    )
    .catch(err => console.log(err))
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
        onChange={(e) => setEmail(e.target.value)}
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
        onChange={(e) => setPassword(e.target.value)}
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
