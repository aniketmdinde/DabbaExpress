import { useState } from "react";
import Loader from "./lib/Loader";





export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 📌 Send OTP Function
  const sendOtp = async () => {
    if (!phone) {
      setError("Please enter a valid phone number.");
      return;
    }

    /// otp operations
  };


  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || !confirmationResult) {
      setError("Please enter a valid OTP.");
      return;
    }

    // the OTP verify operation
  };

  return (
    <div className="flex min-h-screen">

      {/* Left Side - Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10">
        <h2 className="text-3xl text-left font-bold text-gray-800 mb-6">Login to Order</h2>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}


        <form onSubmit={verifyOtp} className="w-full max-w-md">
          {/* Phone Number */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={99999999}
              disabled={isOtpSent}
            />
          </div>

          {/* Send OTP Button */}
          {!isOtpSent && (
            <button
              type="button"
              onClick={sendOtp}
              className={`w-full bg-blue-600 text-white p-3 rounded-lg ${isLoading? "":"hover:bg-blue-700 transition cursor-pointer"}`}
            >
              {
                  isLoading ? (
                    <div className="flex justify-center items-center gap-3">
                      <Loader />
                      Generating OTP
                    </div>
                  ) :

                    "Send OTP"

                }
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
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="submit"
                className={`w-full mt-3  bg-green-600 text-white p-3 rounded-lg ${isLoading ? "" : "hover:bg-green-700 transition cursor-pointer"} `}
                disabled={!otp || !confirmationResult}
              >
                {
                  isLoading ? (
                    <div className="flex justify-center items-center gap-3">
                      <Loader />
                      Verifying
                    </div>
                  ) :

                    "Verify OTP"

                }
              </button>
            </div>
          )}
        </form>

        {/* reCAPTCHA container (Hidden) */}
        <div id="recaptcha-container"></div>
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
