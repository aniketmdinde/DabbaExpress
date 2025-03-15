import { useState, useRef } from "react";

export default function AddFood() {
    const [foodData, setFoodData] = useState({
        foodName: "",
        description: "",
        dietType: "Veg",
        foodType: [],
        maxOrder: "",
        price: "",
        image: null,
        quantities: [{ value: "", unit: "Pieces" }],
    });

    const [preview, setPreview] = useState("");
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({ ...foodData, [name]: value });
    };

    const handleFoodTypeChange = (e) => {
        const { value, checked } = e.target;
        setFoodData((prevData) => {
            const updatedFoodType = checked
                ? [...prevData.foodType, value]
                : prevData.foodType.filter((type) => type !== value);
            return { ...prevData, foodType: updatedFoodType };
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoodData({ ...foodData, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setFoodData({ ...foodData, image: null });
        setPreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Handle quantity change
    const handleQuantityChange = (index, field, value) => {
        const newQuantities = [...foodData.quantities];
        newQuantities[index][field] = value;
        setFoodData({ ...foodData, quantities: newQuantities });
    };

    // Add a new quantity input
    const addQuantityField = () => {
        setFoodData({
            ...foodData,
            quantities: [...foodData.quantities, { value: "", unit: "Pieces" }],
        });
    };

    // Remove a quantity input
    const removeQuantityField = (index) => {
        const newQuantities = foodData.quantities.filter((_, i) => i !== index);
        setFoodData({ ...foodData, quantities: newQuantities });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(foodData);
    };

    return (
        <section className="flex justify-center w-full p-6">
            <div className="flex w-full max-w-7xl gap-3 bg-white shadow-lg rounded-lg ">
                {/* Left Image Section */}
                <div className="hidden md:block w-1/3">
                    <img src="/signup.png" alt="Food Signup" className="w-full h-full object-cover" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-2/3 p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Food Item</h2>

                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Upload Food Image (Optional)</label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {preview && (
                            <div className="flex items-center space-x-4 mt-4">
                                <img src={preview} alt="Food Preview" className="w-24 h-24 rounded-lg object-cover border" />
                                <button type="button" onClick={removeImage} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                                    Remove
                                </button>
                            </div>
                        )}

                        {/* Max Order Limit with Quantity Option */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Food Name/s</label>
                            {foodData.quantities.map((item, index) => (
                                <div key={index} className="flex gap-2 items-center mb-2">
                                    {/* Max Order Input */}
                                    <input
                                        type="text"
                                        className="w-2/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter the food name..."
                                        value={item.value}
                                        onChange={(e) => handleQuantityChange(index, "value", e.target.value)}
                                        required
                                    />

                                    {/* Label for Quantity */}
                                    <span className="text-gray-700 font-semibold">Qty</span>

                                    {/* Quantity Number Input */}
                                    <input
                                        type="number"
                                        className="w-1/3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter quantity"
                                        value={item.quantity || ""}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(index, "quantity", e.target.value)}
                                        required
                                    />

                                    {/* Remove Button for Additional Fields */}
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                                            onClick={() => removeQuantityField(index)}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="mt-2 text-blue-500 font-semibold"
                                onClick={addQuantityField}
                            >
                                + Add More
                            </button>
                        </div>


                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter price"
                                value={foodData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* max Quantity */}
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Food Name</label>
                            <input
                                type="text"
                                name="foodName"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter food name"
                                value={foodData.foodName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                            Add Food Item
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
