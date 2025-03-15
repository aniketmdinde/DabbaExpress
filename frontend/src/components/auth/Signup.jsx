import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserCircle, Phone, MapPin } from 'lucide-react';
import axios from "axios"

const Signup = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
  });

  const handlePhoneSubmit = async(e) => {
    e.preventDefault();
    if (!formData.phone) {
      setError("Please enter a valid phone number.");
      toast.error("Please enter a valid phone number.");  // ✅ Show error toast
      return;
  }

  setIsLoading(true);
  try {
      const response = await axios.post("/api/users/register", {
          phone_no: formData.phone
      });

      console.log(response);
      if (response.status === 201) {
          toast.success(response.data.message);
          setStage(1.5)  // ✅ Correct success toast
      } else {
          toast.error(response.data.message);  // ✅ Correct success toast
      }
  } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");  // ✅ Improved error handling
  } finally {
      setIsLoading(false);
  }

  };

  const handleOTPVerify = async(e) => {
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
            setStage(2);
        } else {
            toast.error(response.data.message);  // ✅ Correct success toast
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");  // ✅ Improved error handling
    } finally {
        setIsLoading(false);
    }

  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await axios.post("/api/users/complete-profile", formData)
            if (response.status === 200) {
                toast.success(response.data.message);  // ✅ Correct success toast
                setIsLoading(false);
                setStage(3);
            }else{
                toast.error(response.data.message);  // ✅ Correct success toast
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");  // ✅ Improved error handling            
        }finally{
            setIsLoading(false);
        }

  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ ...formData }));
    toast.success('Signup completed successfully!');
    navigate('/dashboard');

  };

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="min-h-screen bg-center bg-cover flex items-center justify-center px-4"
         style={{
           backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
           animation: "gradientBG 15s ease infinite"
         }}>
      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl animate-fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 animate-slide-up">
            Create your account
          </h2>
          <div className="flex justify-center space-x-2 mt-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  stage >= step ? 'bg-orange-500 scale-110' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {stage === 1 && (
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
            <div>
                <label htmlFor="role" className="sr-only">Role</label>
                <select
                  id="role"
                  name="role"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transform transition hover:scale-101"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="" disabled>Select Role</option>
                  <option value="user">Customer</option>
                  <option value="provider">Provider</option>
                </select>
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
        )}

        {stage === 1.5 && (
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
              Verify OTP
            </button>
          </form>
        )}

        {stage === 2 && (
          <form onSubmit={handleInfoSubmit} className="mt-8 space-y-6 animate-slide-up">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <div className="relative">
                  <UserCircle className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transform transition hover:scale-101"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="gender" className="sr-only">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transform transition hover:scale-101"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
             
              <div>
                <label htmlFor="address" className="sr-only">Address</label>
                <div className="relative">
                  <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows="3"
                    className="appearance-none rounded-lg relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 transform transition hover:scale-101"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform transition hover:scale-105"
            >
              Continue
            </button>
          </form>
        )}

        {stage === 3 && (
          <form onSubmit={handleFinalSubmit} className="mt-8 space-y-6 animate-slide-up">
            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 ring-4 ring-orange-500 ring-opacity-50">
                  {formData.image ? (
                    <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserCircle className="w-full h-full text-gray-400 p-4" />
                  )}
                </div>
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition transform hover:scale-105"
                >
                  Upload Photo (Optional)
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transform transition hover:scale-105"
            >
              Complete Signup
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;