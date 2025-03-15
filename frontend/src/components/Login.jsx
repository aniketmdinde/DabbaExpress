import { useState } from "react";
import Loader from "./lib/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    role: "", // Add role if needed
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    console.log(formData.phone);
    if (!formData.phone) {
      setError("Please enter a valid phone number.");
      toast.error("Please enter a valid phone number.");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/login", {
        phone_no: formData.phone,
        type: "user", // Add role if needed
      });
      console.log("dwkjdw");

      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        setIsOtpSent(true);
        setError("");
      } else {
        toast.error(response.data.message);
        setIsOtpSent(true);
        setError("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      setError("Please enter a valid OTP.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/verify-otp", {
        phone_no: formData.phone,
        otp: formData.otp,
      });

      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsOtpSent(true);
        setError("");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        toast.error(response.data.message);
        setIsOtpSent(true);
        setError("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (isOtpSent) {
      verifyOtp(e); // Only call verifyOtp if OTP is sent
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10">
        <h2 className="text-3xl text-left font-bold text-gray-800 mb-6">Login to Order</h2>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              maxLength={10} // Adjust maxLength as needed
              disabled={isOtpSent}
            />
          </div>

          {/* Send OTP Button */}
          {!isOtpSent && (
            <button
              type="button" // Ensure this is set to "button"
              onClick={sendOtp}
              className={`w-full bg-blue-600 text-white p-3 rounded-lg ${
                isLoading ? "" : "hover:bg-blue-700 transition cursor-pointer"
              }`}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-3">
                  <Loader />
                  Generating OTP
                </div>
              ) : (
                "Send OTP"
              )}
            </button>
          )}

          {/* OTP Input */}
          {isOtpSent && (
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                OTP
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                required
              />
              <button
                type="submit"
                className={`w-full mt-3 bg-green-600 text-white p-3 rounded-lg ${
                  isLoading ? "" : "hover:bg-green-700 transition cursor-pointer"
                }`}
                disabled={!formData.otp}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center gap-3">
                    <Loader />
                    Verifying
                  </div>
                ) : (
                  "Verify OTP"
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 flex justify-center items-center">
        <img
          src="/auth.png"
          alt="Food Order"
          className="w-3/4 h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}