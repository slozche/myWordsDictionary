import './App.css';
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import {db} from "./firebase";
import Main from './components/Main';
import Create from './components/Create';
import Edit from './components/Edit'
import { loadDictionaryFB } from './redux/modules/dictionary';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(loadDictionaryFB())
  }, []);
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:index' element={<Edit/>}/>
      </Routes>
    </div>
  );
}

export default App;
