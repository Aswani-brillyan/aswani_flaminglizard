
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpCompenent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';
import AddProductComponent from './components/AddProductComponent';
import GetProduct from './components/GetProduct';

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.min.js"
import MakePayment from"./components/MakePayment";

function App() {
  return (
    <BrowserRouter>
          <div className="container-fluid">
            
            <div className="App">
          <header className="App-header">
            <h1 className='gradient-text'>FLAMING LIZARD</h1>
          </header>

          <Routes>
            <Route path='/signup'element={<SignUpCompenent/>} />
            <Route path='/login'element={<LoginComponent/>} />
            <Route path='/addproduct'element={<AddProductComponent/>} />
            <Route path='/'element={<GetProduct/>} />
            <Route path='/makepayment' element={<MakePayment />} />
          </Routes>
        </div>
          </div>
    </BrowserRouter>
  );
}


export default App;
