import  {  Routes, Route } from 'react-router-dom';
import './App.css'
import Welcome from './components/Welcome'
import Survey from './components/Survey';

function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/survey" element={<Survey />} />
    </Routes>
     
    </>
  )
}

export default App
