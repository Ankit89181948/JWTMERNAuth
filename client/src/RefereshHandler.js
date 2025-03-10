
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const RefereshHandler = ({setIsAuthenticated}) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname === '/'||
                location.pathname =='/login'||
                location.pathname =='/signup'
            ){
                navigate('/HomePage',{replace:false});
            }
        }
    }, [location,navigate,setIsAuthenticated]);
  return (
    null
  )
}

export default RefereshHandler