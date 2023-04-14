import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Landing, Home, Detail, Form, NotFound404 } from './views';
import NavBar from './components/NavBar/NavBar';


function App() {
  const location = useLocation();
  return (
    <>
      { location.pathname !== "/" && <NavBar /> }
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<Form />}/>
        <Route path='*' element={<NotFound404 />}/>
      </Routes>
    </>
  );
}

export default App;
