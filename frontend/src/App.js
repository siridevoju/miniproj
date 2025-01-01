import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import CentralSchemes from './pages/CentralSchemes/CentralSchemes';
import StateSchemes from './pages/StateSchemes/StateSchemes';
import Tools from './pages/Tools/Tools';
import Support from './pages/Support/Support';
import ToolDetail from './pages/ToolDetail/ToolDetail';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import AddTool from './pages/AddTool/AddTool';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage/CartPage';
import PrivateRoute from './PrivateRoute';
import { ToastContainer } from 'react-toastify';
import MessageDetail from './pages/MessageDetail/MessageDetail';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <NavbarComponent />
          <ToastContainer />
          <Routes>
            <Route path="/notifications" element={<MessageDetail />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/central-schemes" element={<CentralSchemes />} />
            <Route path="/state-schemes" element={<StateSchemes />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/support" element={<Support />} />
            <Route path="/tools/:id" element={<ToolDetail />} />
            <Route path="/add-tool" element={<AddTool />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
