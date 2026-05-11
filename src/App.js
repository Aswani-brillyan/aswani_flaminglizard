
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpCompenent from './components/SignUpComponent';
import LoginComponent from './components/LoginComponent';
import AddProductComponent from './components/AddProductComponent';
import GetProduct from './components/GetProduct';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './components/Cart'; 
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
          <Navbar />

          <Routes>
            <Route path='/signup'element={<SignUpCompenent/>} />
            <Route path='/login'element={<LoginComponent/>} />
            <Route path='/addproduct'element={<AddProductComponent/>} />
            <Route path='/cart'element={<Cart/>}/>            
            <Route path='/makepayment' element={<MakePayment />} />
          
            <Route path='/'element={
              <ProtectedRoute>
                <GetProduct/>
              </ProtectedRoute>
            }
            />

          </Routes>
        </div>
          </div>
    </BrowserRouter>
    
  );
}


export default App;
