import { useState } from 'react';
import styles from './AuthModal.module.css';
import SignUp from './SignUp';
import Login from './Login';

export function AuthModal({ mode, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1100]">
  <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
    <button
      className="absolute top-4 right-4 text-gray-500 text-xl hover:text-gray-700"
      onClick={onClose}
    >
      ×
    </button>
    <h2 className="text-2xl font-bold mb-4">
      {mode === 'login' ? 'Login' : 'Sign Up'}
    </h2>
    {mode === 'login' ? <Login /> : <SignUp />}
  </div>
</div>
  );
}