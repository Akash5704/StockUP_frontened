import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './home';
function Route() {
  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path='/welcome' element={
              <>
              <Navbar />
              <Hero />
              </>
          }></Route>
          </Routes>
        </BrowserRouter>
      
    </>
  );
}

export default App;