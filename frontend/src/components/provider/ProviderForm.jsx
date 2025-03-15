import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, ChefHat, MapPin } from 'lucide-react';

const ProviderForm = () => {
  const [vegetables, setVegetables] = useState(['', '']);
  const [userLocation, setUserLocation] = useState(null);
  const [formData, setFormData] = useState({
    providerName: '',
    contact: '',
    address: '',
    description: '',
    dietType: 'veg',
    fullPrice: '',
    halfPrice: '',
    max_order: '',
    availableTime: '',
    deliveryOptions: [],
    allergenInfo: '',
    image: null
  });

  useEffect(() => {
    // Ask for user location permission when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const handleVegetableChange = (index, value) => {
    const newVegetables = [...vegetables];
    newVegetables[index] = value;
    setVegetables(newVegetables);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const options = [...formData.deliveryOptions];
      if (checked) {
        options.push(value);
      } else {
        const index = options.indexOf(value);
        if (index > -1) {
          options.splice(index, 1);
        }
      }
      setFormData({ ...formData, deliveryOptions: options });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create menu maps for full and half tiffin
    const fullMenu = new Map();
    fullMenu.set('chapati', 4);
    fullMenu.set('dal', 1);
    fullMenu.set('rice', 1);
    vegetables.forEach(veg => {
      if (veg.trim()) fullMenu.set(veg, 1);
    });
    
    const halfMenu = new Map();
    halfMenu.set('chapati', 2);
    halfMenu.set('dal', 1);
    halfMenu.set('rice', 1);
    // For half tiffin, we'll let the user choose one vegetable at order time
    // but we still need to include both options in the schema
    vegetables.forEach(veg => {
      if (veg.trim()) halfMenu.set(veg, 0.5); // Indicating that only one will be chosen
    });
    
    // Format data according to the backend schema
    const tiffinData = {
      user: "currentUserId", // This would come from auth context in a real app
      tiffin: {
        full: {
          menu: Object.fromEntries(fullMenu),
          price: parseFloat(formData.fullPrice)
        },
        half: {
          menu: Object.fromEntries(halfMenu),
          price: parseFloat(formData.halfPrice)
        }
      },
      diet: formData.dietType,
      max_order: parseInt(formData.max_order),
      image: formData.image,
      deliveryOptions: formData.deliveryOptions,
      location: userLocation
    };
    
    console.log("Submitting tiffin data:", tiffinData);
    // Here you would make an API call to save the data
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in">
          <div className="text-center">
            <div className="inline-block p-3 rounded-full bg-orange-100 mb-4">
              <ChefHat className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Tiffin Service</h2>
            <p className="text-gray-600">Share your delicious home-cooked meals with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            

            {/* Vegetables Section */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold text-gray-800">Vegetable Options</h3>
              <p className="text-sm text-gray-600">Add exactly 2 vegetables that will be included in your tiffin</p>
              
              <div className="space-y-3">
                {vegetables.map((veg, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={veg}
                      onChange={(e) => handleVegetableChange(index, e.target.value)}
                      placeholder={`Vegetable ${index + 1}`}
                      className="rounded-lg border-gray-300 border p-3 flex-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tiffin Options Section */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-semibold text-gray-800">Tiffin Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Tiffin Card */}
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 shadow-sm">
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
                
                {/* Half Tiffin Card */}
                <div className="bg-green-50 rounded-lg p-4 border border-green-200 shadow-sm">
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
                      className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      value={formData.halfPrice}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing and Availability Section */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold text-gray-800">Availability & Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dietType"
                        value="veg"
                        checked={formData.dietType === 'veg'}
                        onChange={handleInputChange}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>Vegetarian</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dietType"
                        value="non-veg"
                        checked={formData.dietType === 'non-veg'}
                        onChange={handleInputChange}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span>Non-Vegetarian</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Time</label>
                  <input
                    type="time"
                    name="availableTime"
                    className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    value={formData.availableTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Orders Per Day</label>
                <input
                  type="number"
                  name="max_order"
                  placeholder="Maximum number of orders you can fulfill"
                  className="rounded-lg border-gray-300 border p-3 w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  value={formData.max_order}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-xl font-semibold text-gray-800">Additional Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</label>
                <div className="space-y-2">
                  {[
                    { value: 'pickup', label: 'Customer Pickup' },
                    { value: 'providerDelivery', label: 'Provider Delivery' },
                    { value: 'partnerDelivery', label: 'Partner Delivery' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="deliveryOptions"
                        value={option.value}
                        checked={formData.deliveryOptions.includes(option.value)}
                        onChange={handleInputChange}
                        className="text-orange-500 focus:ring-orange-500 rounded"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiffin Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-500 transition-colors">
                  <div className="space-y-1 text-center">
                    {formData.image ? (
                      <div className="relative">
                        <img src={formData.image} alt="Preview" className="mx-auto h-32 w-auto rounded-lg" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: null })}
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-orange-500 hover:text-orange-600 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
              <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-orange-500 mr-2" />
                  <span className="text-sm text-gray-700">
                    {userLocation
                      ? `Location set: (${userLocation.latitude.toFixed(3)}, ${userLocation.longitude.toFixed(3)})`
                      : 'Fetching your location...'}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-all text-lg font-semibold"
                >
                  Submit Tiffin Service
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

