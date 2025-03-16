import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import ProviderForm from './components/provider/ProviderForm';
import CustomerPage from './components/customer/CustomerPage';
import ProviderDashboard from './components/provider/ProviderDashboard';
// import { AuthProvider } from './context';
import CustomerDashboard from './components/customer/CustomerDashboard';

function App() {
  return (
    // <AuthProvider>

      <Router>
        <div className="min-h-screen bg-white">
          <ToastContainer position="bottom-right" autoClose={3000} />
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/user/dashboard" element={<CustomerDashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/provider/create" element={<ProviderForm />} />
            <Route path="/order" element={<CustomerPage />} />
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Features />
                  <HowItWorks />
                </>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    // </AuthProvider>
  );
}

export default App;