import React from 'react'
import LoginCard from '../components/LoginCard'
import RegisterCard from '../components/RegisterCard';
import { useState } from 'react';

function Login() {
  const [isLogin,setIsLogin] = useState(true)
  const switchToRegister =()=> setIsLogin(false);
  const switchToLogin = ()=> setIsLogin(true);

  return (
    <>
      <div className="div">
        {isLogin?(
          <LoginCard switchToRegister={switchToRegister}/>
        ):(
          <RegisterCard switchToLogin={switchToLogin}/>
        )

      }
        

      </div>
        
    </>
  )
}

export default Login