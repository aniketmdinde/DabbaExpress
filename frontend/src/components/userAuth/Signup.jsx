import { useRef, useState } from "react";
import Loader from "../lib/Loader";

export default function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        address: "",
        phone: "",
        otp: "",
        profilePic: null,
    });

    const [preview, setPreview] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleProfilePic = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profilePic: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeProfilePic = () => {
        setFormData({ ...formData, profilePic: null });
        setPreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const sendOtp = async () => {
        if (!formData.phone) {
            setError("Please enter a valid phone number.");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsOtpSent(true);
            setIsLoading(false);
        }, 2000);
    };

    const verifyOtp = (e) => {
        e.preventDefault();
        if (!formData.otp) {
            setError("Please enter a valid OTP.");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
        }, 2000);
    };

    const handleNext = () => {
        if (step === 2 && (!formData.fullName || !formData.address || !formData.gender)) {
            setError("Please fill all details.");
            return;
        }
        setStep((prev) => prev + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Only allow submission on Step 3 when all required fields are filled
        if (step === 3) {
            if (!formData.fullName || !formData.address || !formData.gender) {
                setError("Please fill all details.");
                return;
            }
            // Handle final submission logic here
            console.log("Form submitted successfully!", formData);
            alert("Form submitted successfully!");
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Signup for Ordering</h2>
                <p className="text-gray-600 mb-6">Step {step} of 3</p>
                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="w-full max-w-md">
                    {step === 1 && (
                        <>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                            <input
                                type="tel"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                disabled={isOtpSent}
                            />
                            {!isOtpSent && (
                                <button type="button" onClick={sendOtp} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition mt-3" disabled={isLoading}>
                                    {isLoading ? <Loader /> : "Send OTP"}
                                </button>
                            )}
                            {isOtpSent && (
                                <>
                                    <label className="block text-gray-700 text-sm font-semibold mt-4">OTP</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter OTP"
                                        value={formData.otp}
                                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                        required
                                    />
                                    <button type="submit" onClick={verifyOtp} className="w-full mt-3 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition" disabled={isLoading}>
                                        {isLoading ? <Loader /> : "Verify OTP"}
                                    </button>
                                </>
                            )}
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter full name"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                required
                            />

                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter the Address"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                required
                            />

                            <label className="block text-gray-700 text-sm font-semibold mt-4">Gender</label>
                            <select
                                className="w-full p-3 border rounded-lg"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <button type="button" onClick={handleNext} className="w-full mt-3 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">Next</button>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <p className="text-gray-600 text-sm mb-2 text-center">
                                (Optional) Upload a profile picture or skip.
                            </p>

                            <div className="flex flex-col items-center">
                                {!preview ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current.click()}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Upload Photo
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfilePic}
                                            ref={fileInputRef}
                                            className="hidden"
                                        />
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-24 h-24 object-cover rounded-full border-2 border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeProfilePic}
                                            className="text-red-500 mt-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-3 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                            >
                                {preview ? "Submit" : "Skip and Submit"}
                            </button>
                        </>
                    )}
                </form>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <img src="/signup.png" alt="Signup" className="w-full object-contain" />
            </div>
        </div>
    );
}