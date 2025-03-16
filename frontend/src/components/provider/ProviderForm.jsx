import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, ChefHat, MapPin } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProviderForm = () => {
  const [vegetables, setVegetables] = useState(['', '']);
  const [userLocation, setUserLocation] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dietType: "veg",
    fullPrice: "",
    halfPrice: "",
    max_order: "",
    availableTime: "",
    deliveryOptions: [],
    allergenInfo: "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    // Add scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-appear');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const handleVegetableChange = (index, value) => {
    const newVegetables = [...vegetables];
    newVegetables[index] = value;
    setVegetables(newVegetables);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const options = new Set(prevData.deliveryOptions);
        checked ? options.add(value) : options.delete(value);
        return { ...prevData, deliveryOptions: Array.from(options) };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tiffinData = {
      half: {
        menu: {
          chapatis: 2,
          vegetable: vegetables[0],
          dal: 1,
          rice: 1
        },
        price: formData.halfPrice
      },
      full: {
        menu: {
          chapatis: 4,
          vegetables: vegetables,
          dal: 1,
          rice: 1
        },
        price: formData.fullPrice
      }
    };


    const formDataToSend = new FormData();
    formDataToSend.append("tiffin", JSON.stringify(tiffinData));
    formDataToSend.append("diet", formData.dietType);
    formDataToSend.append("max_order", formData.max_order);
    formDataToSend.append("availableTime", formData.availableTime);
    formDataToSend.append("allergenInfo", formData.allergenInfo);
    formDataToSend.append("deliveryOptions", JSON.stringify(formData.deliveryOptions));

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const res = await axios.post("/api/tiffin", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (userLocation) {
        await axios.post("/api/users/update-location", userLocation);
      }

      if (res.status === 201) {
        toast.success("Tiffin created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting tiffin data:", error);
      toast.error(error.response?.data?.message || "Error submitting tiffin data");
    }
  };
  
  const sections = [
    { title: "Vegetable Options", icon: <Plus className="h-6 w-6" /> },
    { title: "Tiffin Options", icon: <ChefHat className="h-6 w-6" /> },
    { title: "Availability & Preferences", icon: <MapPin className="h-6 w-6" /> },
    { title: "Additional Details", icon: <Upload className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background geometric patterns */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-to-r from-orange-300 to-yellow-200 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-gradient-to-l from-amber-200 to-orange-100 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-gradient-to-tr from-yellow-100 to-orange-200 blur-3xl"></div>
      </div>

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PGNpcmNsZSBmaWxsPSJyZ2JhKDI1NSwgMTY1LCAwLCAwLjA1KSIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-50 z-0"></div>

      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 border border-orange-100">
          {/* Title with animation */}
          <div className="text-center animate-fade-in">
            <div className="inline-block p-3 rounded-full bg-orange-100 mb-4 shadow-md">
              <ChefHat className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Tiffin Service</h2>
            <p className="text-gray-600">Share your delicious home-cooked meals with the community</p>
          </div>

          {/* Progress steps indicator */}
          <div className="flex justify-between items-center px-2 py-4">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  activeSection === index ? "scale-110" : "opacity-70"
                }`}
                onClick={() => setActiveSection(index)}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-1 transition-colors duration-300 ${
                  activeSection >= index 
                    ? "bg-orange-500 text-white" 
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {section.icon}
                </div>
                <span className={`text-xs font-medium ${
                  activeSection === index ? "text-orange-500" : "text-gray-500"
                }`}>
                  {section.title}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Vegetables Section */}
            <div className={`space-y-4 animate-on-scroll transition-all duration-500 ${
              activeSection === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 hidden"
            }`}>
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="bg-orange-100 p-2 rounded-full mr-2">
                  <Plus className="h-4 w-4 text-orange-500" />
                </span>
                Vegetable Options
              </h3>
              <p className="text-sm text-gray-600">Add exactly 2 vegetables that will be included in your tiffin</p>
              
              <div className="space-y-3">
                {vegetables.map((veg, index) => (
                  <div key={index} className="flex items-center space-x-2 hover:translate-x-1 transition-transform">
                    <input
                      type="text"
                      value={veg}
                      onChange={(e) => handleVegetableChange(index, e.target.value)}
                      placeholder={`Vegetable ${index + 1}`}
                      className="rounded-lg border-gray-300 border p-3 flex-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all hover:shadow-md"
                      required
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
                <select
                  name="dietType"
                  value={formData.dietType}
                  onChange={handleInputChange}
                  className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                >
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                </select>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => setActiveSection(1)}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Tiffin Options Section */}
            <div className={`space-y-4 animate-on-scroll transition-all duration-500 ${
              activeSection === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 hidden"
            }`}>
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="bg-orange-100 p-2 rounded-full mr-2">
                  <ChefHat className="h-4 w-4 text-orange-500" />
                </span>
                Tiffin Options
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Tiffin Card with hover effect */}
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <h4 className="text-lg font-semibold text-orange-700 mb-3">Full Tiffin</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-gray-700">
                      <span className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-orange-700">4</span>
                      Chapatis
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-orange-700">2</span>
                      Vegetables ({vegetables[0] || 'Vegetable 1'} & {vegetables[1] || 'Vegetable 2'})
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-orange-700">1</span>
                      Dal
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="bg-orange-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-orange-700">1</span>
                      Rice
                    </li>
                  </ul>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Tiffin Price (₹)</label>
                    <input
                      type="number"
                      name="fullPrice"
                      placeholder="Price"
                      className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      value={formData.fullPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Half Tiffin Card with hover effect */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <h4 className="text-lg font-semibold text-green-700 mb-3">Half Tiffin</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center text-gray-700">
                      <span className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-green-700">2</span>
                      Chapatis
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-green-700">1</span>
                      Vegetable (Customer's choice of one)
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-green-700">1</span>
                      Dal
                    </li>
                    <li className="flex items-center text-gray-700">
                      <span className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center mr-2 text-green-700">1</span>
                      Rice
                    </li>
                  </ul>
                  <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Half Tiffin Price (₹)</label>
                    <input
                      type="number"
                      name="halfPrice"
                      placeholder="Price"
                      className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      value={formData.halfPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => setActiveSection(0)}
                >
                  Back
                </button>
                <button 
                  type="button" 
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => setActiveSection(2)}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Availability & Preferences */}
            <div className={`space-y-4 animate-on-scroll transition-all duration-500 ${
              activeSection === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 hidden"
            }`}>
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="bg-orange-100 p-2 rounded-full mr-2">
                  <MapPin className="h-4 w-4 text-orange-500" />
                </span>
                Availability & Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Orders per Day</label>
                  <input
                    type="number"
                    name="max_order"
                    placeholder="e.g., 10"
                    className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    value={formData.max_order}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Time</label>
                  <input
                    type="text"
                    name="availableTime"
                    placeholder="e.g., 12 PM - 3 PM"
                    className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    value={formData.availableTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</label>
                <div className="space-y-2">
                  {["pickup", "delivery"].map((option) => (
                    <label key={option} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        name="deliveryOptions"
                        value={option}
                        checked={formData.deliveryOptions.includes(option)}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => setActiveSection(1)}
                >
                  Back
                </button>
                <button 
                  type="button" 
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => setActiveSection(3)}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Additional Details */}
            <div className={`space-y-4 animate-on-scroll transition-all duration-500 ${
              activeSection === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 hidden"
            }`}>
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <span className="bg-orange-100 p-2 rounded-full mr-2">
                  <Upload className="h-4 w-4 text-orange-500" />
                </span>
                Additional Details
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergen Info (Optional)</label>
                <input
                  type="text"
                  name="allergenInfo"
                  placeholder="e.g., Contains peanuts"
                  className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  value={formData.allergenInfo}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-700"
                />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="mt-4 rounded-lg w-full h-40 object-cover" />
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={() => setActiveSection(2)}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderForm;
