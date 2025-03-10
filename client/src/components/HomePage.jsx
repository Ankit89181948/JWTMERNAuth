import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
const HomePage = () => {
  const [UserName,setUserName] = useState('');
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user);
  },[]);


  const navigate=useNavigate();

  const handleLogout=()=>{
    handleSuccess("Logged out successfully");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTimeout(()=>{
      navigate('/login');
    },1000);
   
  }
  const [products, setProducts] = useState('');
  const fetchProducts = async () => {
    try {
        const url = "http://localhost:8080/products";
        const response = await fetch(url, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setProducts(result);
    } catch (err) {
        handleError(err);
        console.error("Fetch error:", err);
    }
  }
  useEffect(() => {
      fetchProducts()
  }, [])

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Navbar */}
      <nav className='bg-white shadow-md'>
        <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold text-gray-800'>Home</h1>
          <button
            onClick={handleLogout}
            className='px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className='container mx-auto px-6 py-8'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-4'>Welcome to the Homepage! {UserName}</h2>
          <p className='text-gray-600 mb-6'>
            This is a simple homepage with a logout button.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Placeholder Cards */}
            <div className='bg-blue-50 p-6 rounded-lg shadow-sm'>
              <h3 className='text-lg font-semibold text-blue-800'>Card 1</h3>
              <p className='text-gray-600'>Some Random Info.</p>
            </div>
            <div className='bg-green-50 p-6 rounded-lg shadow-sm'>
              <h3 className='text-lg font-semibold text-green-800'>Card 2</h3>
              <p className='text-gray-600'>Some Random Info.</p>
            </div>
            <div className='bg-yellow-50 p-6 rounded-lg shadow-sm'>
              <h3 className='text-lg font-semibold text-yellow-800'>Card 3</h3>
              <p className='text-gray-600'>Some Random Info.</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;