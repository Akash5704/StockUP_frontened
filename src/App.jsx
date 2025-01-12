import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import Login from './components/AuthModal/Login';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import SignUp from './components/AuthModal/SignUp';
import MainLayout from './pages/MainLayout';
import Portfolio from './pages/Portfolio';
import H from './h';
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
        
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<SignUp/>}></Route>
        {/* <Route element={<MainLayout/>}>
        <Route path='/register' element={<SignUp/>}></Route>
        <Route path='/portfolio' element={<Portfolio/>}/>
        
        </Route> */}
        <Route path='/home' element={<H/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
