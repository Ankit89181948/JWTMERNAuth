import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import { handleError, handleSuccess } from '../utils';
const Signup = () => {

  const [user,setUser]=useState({
    name:'',
    email:'',
    password:''
  });
  const navigate=useNavigate();
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setUser({
      ...user,
      [name]:value
    });
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(user);  
    const {name,email,password}=user;
    if(!name || !email || !password){
      return handleError("All fields are required");
    }

    try{
      const url = 'https://jwtmernauth.onrender.com/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      const {success, message , error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login');
        },1000)
      }
      else if(error){
        const details = error?.details[0]?.message;
        handleError(details);
      }
      else if (!success){
        handleError(message);
      }
    }catch(err){
      console.log(err);
    }
    
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center text-gray-900'>Signup</h1>

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter Your Name'
              value={user.name}
              onChange={handleChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter Your Email'
              value={user.email}
              onChange={handleChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter Your Password'
              value={user.password}
              onChange={handleChange}
              className='w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Signup
          </button>

          <div className='text-sm text-center text-gray-600'>
            <span>Already have an account? </span>
            <Link to='/login' className='font-medium text-blue-600 hover:text-blue-500'>
              Login
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;