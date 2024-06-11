import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import EmpeditTable from './components/Emp-editTable/EmpeditTable'
import EmpcreateTable  from './components/Emp-createTable/EmpcreateTable';

import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route  path="/" element={<Home />} />  
        <Route path="/create" element={<EmpcreateTable />} />
        <Route path="/edit/:id" element={<EmpeditTable />} />
      </Routes>
    </>
  )
}

export default App
