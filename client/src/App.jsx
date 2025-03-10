
import './App.css'
import { Navigate, Route, Routes} from 'react-router-dom'
import HomePage from './components/HomePage'
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react'
import RefereshHandler from './RefereshHandler'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRoute =({element})=>{
    return isAuthenticated ? element : <Navigate to='/login'/>
  }
  
  return (
    <div className='App'>
      <RefereshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/HomePage' element={<PrivateRoute element={<HomePage/>} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
