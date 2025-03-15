import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Phone } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    otp: ''
  });

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!formData.phone) {
      setError("Please enter a valid phone number.");
      toast.error("Please enter a valid phone number.");  // ✅ Show error toast
      return;
    }

    setIsLoading(true);
    console.log(`dhd`);
    try {
      const response = await axios.post("/api/users/login", {
        phone_no: formData.phone,
      });

      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        setStage(2)  // ✅ Correct success toast
      } else {
        toast.error(response.data.message);  // ✅ Correct success toast
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");  // ✅ Improved error handling
    } finally {
      setIsLoading(false);
    }

  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setError("Please enter a valid OTP.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/verify-otp", {
        phone_no: formData.phone,
        otp: formData.otp
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);  // ✅ Correct success toast

        navigate("/dashboard")  // ✅ Correct success toast
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");  // ✅ Improved error handling
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-center bg-cover flex items-center justify-center px-4"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        animation: "gradientBG 15s ease infinite"
      }}>
      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 animate-slide-up">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fade-in-delay">
            Login with your phone number
          </p>
        </div>

        {stage === 1 ? (
          <form onSubmit={handlePhoneSubmit} className="mt-8 space-y-6 animate-slide-up">
            <div>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <div className="relative">
                <Phone className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transform transition hover:scale-101"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform transition hover:scale-105"
            >
              {
                isLoading? (
                  <div className="flex items-center justify-center h-8 w-8">
                    <div className="animate-spin rounded-full h-3 w-3 bg-orange-500" />
                  </div>
                ) : (
                  "Send OTP"
                )
              }
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerify} className="mt-8 space-y-6 animate-slide-up">
            <div>
              <label htmlFor="otp" className="sr-only">OTP</label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transform transition hover:scale-101"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform transition hover:scale-105"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;