
// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Sidebar from './Sidebar'
// export default function MainLayout() {
    
//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar */}
//       <Sidebar handleLogout={handleLogout} />

//       {/* Main Content */}
//       <main className="lg:ml-64 flex-grow bg-gray-100">
//         <Outlet /> {/* Placeholder for nested routes */}
//       </main>
//     </div>
//   )
// }

import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
export default function MainLayout() {
  let user = sessionStorage.getItem("User")
  const navigate = useNavigate()
  useEffect(()=>{

    if (!user){
      navigate("/")
    }
  },[user])

   
  const handleLogout = () => {
    sessionStorage.removeItem('User'); // Clear session
    sessionStorage.removeItem('User'); // Optional: Clear user-specific data
    navigate('/');
  };
  return (
    <div>
        <Sidebar handleLogout={handleLogout}/>
        <Outlet/>
    </div>
  )
}
