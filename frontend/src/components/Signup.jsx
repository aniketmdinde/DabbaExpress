import { useEffect, useRef, useState } from "react";
import Loader from "./lib/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"

export default function Signup() {
    const { role } = useParams();

    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const totalSteps = 3; 
    const [formData, setFormData] = useState({
        fullName: "",
        gender: "",
        address: "",
        phone: "",
        otp: "",
        avatar: null,
    });

    const [preview, setPreview] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null);

    const handleProfilePic = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, avatar: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeProfilePic = () => {
        setFormData({ ...formData, avatar: null });
        setPreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const sendOtp = async () => {
        if (!formData.phone) {
            setError("Please enter a valid phone number.");
            toast.error("Please enter a valid phone number.");  // ✅ Show error toast
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post("/api/users/register", {
                phone_no: formData.phone,
                type: role
            });

            console.log(response);
            if (response.status === 201) {
                toast.success(response.data.message);  // ✅ Correct success toast
                setIsOtpSent(true);
                setError("");
            } else {
                toast.error(response.data.message);  // ✅ Correct success toast
                setIsOtpSent(true);
                setError("");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");  // ✅ Improved error handling
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
                otp: formData.otp
            });

            console.log(response);
            if (response.status === 200) {
                toast.success(response.data.message);  // ✅ Correct success toast
                setIsOtpSent(true);
                setError("");
                setStep(2);
            } else {
                toast.error(response.data.message);  // ✅ Correct success toast
                setIsOtpSent(true);
                setError("");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");  // ✅ Improved error handling
        } finally {
            setIsLoading(false);
        }
    };

    const completeProfile = async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        const updatedFormData = { ...formData, type: role };
        try {
            const response = await axios.post("/api/users/complete-profile", updatedFormData)
            if (response.status === 200) {
                toast.success(response.data.message);  // ✅ Correct success toast
                setIsLoading(false);
                setStep(3);
            }else{
                toast.error(response.data.message);  // ✅ Correct success toast
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");  // ✅ Improved error handling            
        }finally{
            setIsLoading(false);
        }
    }

    const uploadProfilePic = async () => {
        console.log(`heelo`);
        if (!formData.avatar) {
            navigate("/dashboard"); // Skip upload if no profile picture
            return;
        }

        setIsLoading(true);
        

        try {
            const response = await axios.post("/api/users/upload-avatar", {
                avatar: formData.avatar,
            }, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                toast.success("Profile picture uploaded successfully!");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload profile picture.");
            navigate("/dashboard"); // Proceed to dashboard even if upload fails
        } finally {
            setIsLoading(false);
        }
    };

 
    

    const handleSubmit = async (e) => {
        console.log(`heelo55`);
        e.preventDefault(); // Prevent default form submission


        // Only allow submission on Step 3 when all required fields are filled
        if (step === 3) {
            if (!formData.fullName || !formData.address || !formData.gender) {
                setError("Please fill all details.");
                return;
            }
            const updatedFormData = { ...formData, type: role };
            // Handle final submission logic here
            try {
                const response = await axios.post("/api/users/signup", updatedFormData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                console.log("Signup successful!", response.data);

            } catch (error) {
                console.log(`Error`, error);
            }
        }
    };


    useEffect(() => {
        console.log("Updated Step:", step);
    }, [step]);


    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Signup for Ordering</h2>

                {/* Step Indicator */}
                <div className="flex items-center justify-center w-full mb-6">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`w-10 h-10 flex items-center justify-center text-white font-bold rounded-full
                                    ${s === step ? "bg-blue-600" : "bg-gray-400"}
                                `}
                            >
                                {s}
                            </div>
                            {s !== totalSteps && (
                                <div className={`w-10 h-1 ${s < step ? "bg-blue-600" : "bg-gray-400"}`}></div>
                            )}
                        </div>
                    ))}
                </div>
                {error && <p className="text-red-500">{error}</p>}

                <form  className="w-full max-w-md">
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
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <button
                                type="button"
                                onClick={completeProfile}
                                className="w-full mt-3 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                Next
                            </button>
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

                            <button type="button" onClick={uploadProfilePic} className="w-full mt-3 bg-green-600 text-white p-3 rounded-lg">
                                {preview ? "Upload & Proceed" : "Skip & Proceed"}
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