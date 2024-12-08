
import './App.css';
import {  Navigate, Route, HashRouter   as Router, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { AuthContext, AuthProvider } from './Services/AuthContext';
import { useContext } from 'react';
import { ToastProvider } from './Services/ToastContext';
import { LayoutComponent } from './Components/LayoutComponent';
import { StoreProvider } from './Services/StoreContext';
import { Store } from './Pages/Store';
import { Users } from './Pages/Users';
import { Upc } from './Pages/Upc';
import { Des } from './Pages/Des';
import { Invoice } from './Pages/Invoice';
import { Nxt } from './Pages/Nxt';
import { Bill } from './Pages/Bill';
import { Change } from './Pages/Change';
import { RevenueAll } from './Pages/RevenueAll';
import { RevenueStore } from './Pages/RevenueStore';
import { RevenueEmp } from './Pages/RevenueEmp';
import { PaymentStore } from './Pages/PaymentStore';
import { SlipPage } from './Pages/SlipPage';
import { SlipsPage } from './Pages/SlipsPage';
import { AsnPage } from './Pages/AsnPage';
import { VoucherPage } from './Pages/VoucherPage';
import { VouchersPage } from './Pages/VouchersPage';
import { Customers } from './Pages/Customers';
import { RevenueCus } from './Pages/RevenueCus';
// Component để bảo vệ route
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {isLoggedIn}=useContext(AuthContext)
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};
 const App:React.FC=() =>{
 
  return (
    <ToastProvider>
    
   
    <Router basename='/thientc79/'>
    <AuthProvider>
    
    <StoreProvider>
    <Routes>
    
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<ProtectedRoute><LayoutComponent /></ProtectedRoute>} >
        <Route index element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/change" element={<Change/>} />
        <Route path="/upc" element={<Upc/>} />
        <Route path="/des" element={<Des/>} />
        <Route path="/nxt" element={<Nxt/>} />
        <Route path="/invoice" element={<Invoice/>} />
        <Route path="/bill" element={<Bill/>} />
        <Route path="/revenueAll" element={<RevenueAll/>} />
        <Route path="/revenueStore" element={<RevenueStore/>} />
        <Route path="/revenueEmp" element={<RevenueEmp/>} />
        <Route path="/payment" element={<PaymentStore/>} />
        <Route path="/slip" element={<SlipPage/>} />
        <Route path="/slips" element={<SlipsPage/>} />
        <Route path="/voucher" element={<VoucherPage/>} />
        <Route path="/vouchers" element={<VouchersPage/>} />
        <Route path="/asn" element={<AsnPage/>} />
        <Route path="/cus" element={<Customers/>} />
        <Route path="/revenueCus" element={<RevenueCus/>} />
        </Route>
      </Routes> 
      </StoreProvider>
      </AuthProvider> 
    </Router>
    
   
    </ToastProvider>
  );
}
export default App

