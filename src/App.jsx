import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import Login from './components/AuthModal/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import SignUp from './components/AuthModal/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from '/' to '/welcome' */}
        {/* <Route path="/" element={<Navigate to="/welcome"/>} /> */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
            </>
          }
        />
        
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<SignUp/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
