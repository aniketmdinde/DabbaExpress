// import React, { useState, useEffect } from 'react';
// import { 
//   MapPin, 
//   Calendar, 
//   Clock, 
//   Leaf, 
//   Drumstick, 
//   AlertTriangle, 
//   ShoppingCart, 
//   ChevronRight, 
//   Home, 
//   Store, 
//   X, 
//   Check
// } from 'lucide-react';

// // Temporary API data to simulate backend
// const tempTiffins = [
//   {
//     _id: "t1",
//     user: { _id: "u1", name: "Anita's Kitchen", address: "123 Gandhi Road" },
//     tiffin: {
//       half: {
//         menu: {
//           chapatis: 2,
//           vegetable: "Mixed Vegetables",
//           dal: 1,
//           rice: 1
//         },
//         price: 80
//       },
//       full: {
//         menu: {
//           chapatis: 4,
//           vegetables: ["Paneer Butter Masala", "Aloo Gobi"],
//           dal: 1,
//           rice: 1
//         },
//         price: 150
//       }
//     },
//     diet: "veg",
//     max_order: 20,
//     availableTime: "12:00 PM - 3:00 PM",
//     allergenInfo: "May contain dairy and nuts",
//     image: "/api/placeholder/300/200",
//     deliveryOptions: ["pickup", "delivery"]
//   },
//   {
//     _id: "t2",
//     user: { _id: "u2", name: "Raj's Tiffin Service", address: "456 Nehru Street" },
//     tiffin: {
//       half: {
//         menu: {
//           chapatis: 2,
//           vegetable: "Bhindi Masala",
//           dal: 1,
//           rice: 1
//         },
//         price: 90
//       },
//       full: {
//         menu: {
//           chapatis: 4,
//           vegetables: ["Malai Kofta", "Chana Masala"],
//           dal: 1,
//           rice: 1
//         },
//         price: 160
//       }
//     },
//     diet: "veg",
//     max_order: 15,
//     availableTime: "11:30 AM - 2:30 PM",
//     allergenInfo: "May contain dairy and gluten",
//     image: "/api/placeholder/300/200",
//     deliveryOptions: ["pickup", "delivery"]
//   },
//   {
//     _id: "t3",
//     user: { _id: "u3", name: "Meera's Home Food", address: "789 Tagore Lane" },
//     tiffin: {
//       half: {
//         menu: {
//           chapatis: 2,
//           vegetable: "Jeera Aloo",
//           dal: 1,
//           rice: 1
//         },
//         price: 85
//       },
//       full: {
//         menu: {
//           chapatis: 4,
//           vegetables: ["Baingan Bharta", "Matar Paneer"],
//           dal: 1,
//           rice: 1
//         },
//         price: 155
//       }
//     },
//     diet: "veg",
//     max_order: 25,
//     availableTime: "12:30 PM - 3:30 PM",
//     allergenInfo: "May contain dairy",
//     image: "/api/placeholder/300/200",
//     deliveryOptions: ["pickup"]
//   },
//   {
//     _id: "t4",
//     user: { _id: "u4", name: "Mumbai Tiffins", address: "101 Marine Drive" },
//     tiffin: {
//       half: {
//         menu: {
//           chapatis: 2,
//           vegetable: "Chicken Curry",
//           dal: 1,
//           rice: 1
//         },
//         price: 100
//       },
//       full: {
//         menu: {
//           chapatis: 4,
//           vegetables: ["Butter Chicken", "Egg Curry"],
//           dal: 1,
//           rice: 1
//         },
//         price: 180
//       }
//     },
//     diet: "non-veg",
//     max_order: 10,
//     availableTime: "1:00 PM - 4:00 PM",
//     allergenInfo: "Contains chicken, eggs and dairy",
//     image: "/api/placeholder/300/200",
//     deliveryOptions: ["pickup", "delivery"]
//   }
// ];

// const CustomerPage = () => {
//   const [tiffins, setTiffins] = useState([]);
//   const [selectedTiffin, setSelectedTiffin] = useState(null);
//   const [orderDetails, setOrderDetails] = useState({
//     size: "",
//     selectedVegetable: "",
//     quantity: 1,
//     deliveryMethod: "",
//     totalPrice: 0
//   });
//   const [orderStep, setOrderStep] = useState(0); // 0: Browse, 1: Select Size, 2: Customize, 3: Delivery, 4: Payment
  
//   useEffect(() => {
//     // Simulate fetching data from API
//     setTiffins(tempTiffins);
//   }, []);

//   const handleSelectTiffin = (tiffin) => {
//     setSelectedTiffin(tiffin);
//     setOrderStep(1);
//     // Reset order details when selecting a new tiffin
//     setOrderDetails({
//       size: "",
//       selectedVegetable: "",
//       quantity: 1,
//       deliveryMethod: "",
//       totalPrice: 0
//     });
//   };

//   const handleSizeSelect = (size) => {
//     const price = size === "half" 
//       ? selectedTiffin.tiffin.half.price 
//       : selectedTiffin.tiffin.full.price;
    
//     setOrderDetails({
//       ...orderDetails,
//       size,
//       totalPrice: price * orderDetails.quantity,
//       selectedVegetable: size === "half" ? "" : selectedTiffin.tiffin.full.menu.vegetables[0]
//     });
//     setOrderStep(2);
//   };

//   const handleVegetableSelect = (vegetable) => {
//     setOrderDetails({
//       ...orderDetails,
//       selectedVegetable: vegetable
//     });
//   };

//   const handleQuantityChange = (value) => {
//     const quantity = Math.max(1, parseInt(value) || 1);
//     const basePrice = orderDetails.size === "half" 
//       ? selectedTiffin.tiffin.half.price 
//       : selectedTiffin.tiffin.full.price;
    
//     setOrderDetails({
//       ...orderDetails,
//       quantity,
//       totalPrice: basePrice * quantity
//     });
//   };

//   const handleDeliveryMethod = (method) => {
//     setOrderDetails({
//       ...orderDetails,
//       deliveryMethod: method
//     });
//     setOrderStep(4);
//   };

//   const handlePlaceOrder = () => {
//     // Here you would normally make an API call to create the order
//     console.log("Order placed:", {
//       tiffin: selectedTiffin._id,
//       size: orderDetails.size,
//       quantity: orderDetails.quantity,
//       deliveryMethod: orderDetails.deliveryMethod,
//       totalPrice: orderDetails.totalPrice,
//       selectedVegetable: orderDetails.selectedVegetable
//     });
    
//     // Reset state
//     alert("Order placed successfully!");
//     setSelectedTiffin(null);
//     setOrderStep(0);
//     setOrderDetails({
//       size: "",
//       selectedVegetable: "",
//       quantity: 1,
//       deliveryMethod: "",
//       totalPrice: 0
//     });
//   };

//   const handleCancel = () => {
//     setSelectedTiffin(null);
//     setOrderStep(0);
//     setOrderDetails({
//       size: "",
//       selectedVegetable: "",
//       quantity: 1,
//       deliveryMethod: "",
//       totalPrice: 0
//     });
//   };

//   // Render tiffin cards for browsing
//   const renderTiffinCards = () => {
//     return tiffins.map(tiffin => (
//       <div key={tiffin._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
//         <div className="relative">
//           <img src={tiffin.image} alt={`${tiffin.user.name}'s Tiffin`} className="w-full h-48 object-cover" />
//           <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white bg-blue-600">
//             {tiffin.diet === "veg" ? <Leaf size={16} className="inline mr-1" /> : <Drumstick size={16} className="inline mr-1" />}
//             {tiffin.diet === "veg" ? "Veg" : "Non-Veg"}
//           </div>
//         </div>
        
//         <div className="p-4">
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="text-lg font-bold">{tiffin.user.name}</h3>
//             <div className="text-gray-600 text-sm">
//               <MapPin size={14} className="inline mr-1" /> {tiffin.user.address}
//             </div>
//           </div>
          
//           <div className="mb-4">
//             <div className="text-gray-700 text-sm mb-1">
//               <Clock size={14} className="inline mr-1" /> {tiffin.availableTime}
//             </div>
//             <div className="text-gray-700 text-sm flex items-center">
//               <AlertTriangle size={14} className="inline mr-1" /> 
//               <span className="truncate">{tiffin.allergenInfo}</span>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-200 pt-3 mb-3">
//             <div className="flex justify-between mb-2">
//               <div className="text-sm">
//                 <span className="font-semibold">Half:</span> ₹{tiffin.tiffin.half.price}
//               </div>
//               <div className="text-sm">
//                 <span className="font-semibold">Full:</span> ₹{tiffin.tiffin.full.price}
//               </div>
//             </div>
            
//             <div className="text-sm mb-1">
//               <span className="font-semibold">Half menu:</span> {tiffin.tiffin.half.menu.chapatis} chapatis, {tiffin.tiffin.half.menu.vegetable}
//             </div>
            
//             <div className="text-sm">
//               <span className="font-semibold">Full menu:</span> {tiffin.tiffin.full.menu.chapatis} chapatis, {tiffin.tiffin.full.menu.vegetables.join(", ")}
//             </div>
//           </div>
          
//           <button 
//             onClick={() => handleSelectTiffin(tiffin)}
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
//           >
//             <ShoppingCart size={16} className="mr-2" /> Order Now
//           </button>
//         </div>
//       </div>
//     ));
//   };

//   // Render order steps when a tiffin is selected
//   const renderOrderProcess = () => {
//     switch (orderStep) {
//       case 1: // Select size
//         return (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Select Tiffin Size</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <button 
//                 className={`p-4 border rounded-lg ${orderDetails.size === 'half' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}
//                 onClick={() => handleSizeSelect('half')}
//               >
//                 <h3 className="font-bold mb-2">Half Tiffin - ₹{selectedTiffin.tiffin.half.price}</h3>
//                 <ul className="text-sm text-gray-600 list-disc pl-5">
//                   <li>{selectedTiffin.tiffin.half.menu.chapatis} Chapatis</li>
//                   <li>1 Vegetable: {selectedTiffin.tiffin.half.menu.vegetable}</li>
//                   <li>{selectedTiffin.tiffin.half.menu.dal} Dal</li>
//                   <li>{selectedTiffin.tiffin.half.menu.rice} Rice</li>
//                 </ul>
//               </button>
              
//               <button 
//                 className={`p-4 border rounded-lg ${orderDetails.size === 'full' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}
//                 onClick={() => handleSizeSelect('full')}
//               >
//                 <h3 className="font-bold mb-2">Full Tiffin - ₹{selectedTiffin.tiffin.full.price}</h3>
//                 <ul className="text-sm text-gray-600 list-disc pl-5">
//                   <li>{selectedTiffin.tiffin.full.menu.chapatis} Chapatis</li>
//                   <li>2 Vegetables: {selectedTiffin.tiffin.full.menu.vegetables.join(", ")}</li>
//                   <li>{selectedTiffin.tiffin.full.menu.dal} Dal</li>
//                   <li>{selectedTiffin.tiffin.full.menu.rice} Rice</li>
//                 </ul>
//               </button>
//             </div>
            
//             <div className="flex justify-between mt-4">
//               <button 
//                 onClick={handleCancel}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         );
        
//       case 2: // Customize order
//         return (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Customize Your Tiffin</h2>
            
//             {orderDetails.size === 'half' && (
//               <div className="mb-6">
//                 <h3 className="font-medium mb-2">Select Vegetable:</h3>
//                 <div className="grid grid-cols-1 gap-2">
//                   <button
//                     className={`p-3 border rounded-md text-left ${orderDetails.selectedVegetable === selectedTiffin.tiffin.half.menu.vegetable ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}
//                     onClick={() => handleVegetableSelect(selectedTiffin.tiffin.half.menu.vegetable)}
//                   >
//                     {selectedTiffin.tiffin.half.menu.vegetable}
//                   </button>
//                 </div>
//               </div>
//             )}
            
//             {orderDetails.size === 'full' && (
//               <div className="mb-6">
//                 <h3 className="font-medium mb-2">Select Primary Vegetable:</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                   {selectedTiffin.tiffin.full.menu.vegetables.map((veg, index) => (
//                     <button
//                       key={index}
//                       className={`p-3 border rounded-md text-left ${orderDetails.selectedVegetable === veg ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}
//                       onClick={() => handleVegetableSelect(veg)}
//                     >
//                       {veg}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="mb-6">
//               <h3 className="font-medium mb-2">Quantity:</h3>
//               <input
//                 type="number"
//                 min="1"
//                 value={orderDetails.quantity}
//                 onChange={(e) => handleQuantityChange(e.target.value)}
//                 className="w-full p-3 border rounded-md"
//               />
//             </div>

//             <div className="flex justify-between items-center">
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setOrderStep(3)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
//               >
//                 Next <ChevronRight size={16} className="ml-1" />
//               </button>
//             </div>
//           </div>
//         );

//       case 3: // Delivery Method
//         return (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Select Delivery Method</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {selectedTiffin.deliveryOptions.map((method) => (
//                 <button
//                   key={method}
//                   onClick={() => handleDeliveryMethod(method)}
//                   className={`p-4 border rounded-lg ${orderDetails.deliveryMethod === method ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}
//                 >
//                   {method === 'pickup' ? <Store className="mb-2" size={24} /> : <Home className="mb-2" size={24} />}
//                   <h3 className="font-bold capitalize">{method}</h3>
//                 </button>
//               ))}
//             </div>

//             <div className="flex justify-between">
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setOrderStep(2)}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         );

//       case 4: // Order Summary & Place Order
//         return (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>

//             <div className="mb-4">
//               <p><strong>Tiffin:</strong> {selectedTiffin.user.name}</p>
//               <p><strong>Size:</strong> {orderDetails.size}</p>
//               <p><strong>Vegetable:</strong> {orderDetails.selectedVegetable}</p>
//               <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
//               <p><strong>Delivery Method:</strong> {orderDetails.deliveryMethod}</p>
//               <p><strong>Total Price:</strong> ₹{orderDetails.totalPrice}</p>
//             </div>

//             <div className="flex justify-between mt-6">
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setOrderStep(3)}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={handlePlaceOrder}
//                   className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//                 >
//                   <Check className="mr-1" size={16} /> Place Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 pt-28">
//       {orderStep === 0 && (
//         <div>
//           <h1 className="text-3xl font-bold mb-6">Available Tiffins</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {renderTiffinCards()}
//           </div>
//         </div>
//       )}
      
//       {orderStep !== 0 && (
//         <div>
//           <button
//             onClick={handleCancel}
//             className="flex items-center text-gray-600 mb-4"
//           >
//             <X size={20} className="mr-2" /> Back to Tiffins
//           </button>
//           {renderOrderProcess()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerPage;


import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Leaf, 
  Drumstick, 
  AlertTriangle, 
  ShoppingCart, 
  ChevronRight, 
  Home, 
  Store, 
  X, 
  Check,
  Star,
  Phone,
  CreditCard,
  ThumbsUp
} from 'lucide-react';

// Temporary API data to simulate backend
const tempTiffins = [
  {
    _id: "t1",
    user: { _id: "u1", name: "Anita's Kitchen", address: "123 Gandhi Road" },
    tiffin: {
      half: {
        menu: {
          chapatis: 2,
          vegetable: "Mixed Vegetables",
          dal: 1,
          rice: 1
        },
        price: 80
      },
      full: {
        menu: {
          chapatis: 4,
          vegetables: ["Paneer Butter Masala", "Aloo Gobi"],
          dal: 1,
          rice: 1
        },
        price: 150
      }
    },
    diet: "veg",
    max_order: 20,
    availableTime: "12:00 PM - 3:00 PM",
    allergenInfo: "May contain dairy and nuts",
    image: "/api/placeholder/300/200",
    deliveryOptions: ["pickup", "delivery"],
    rating: 4.7
  },
  {
    _id: "t2",
    user: { _id: "u2", name: "Raj's Tiffin Service", address: "456 Nehru Street" },
    tiffin: {
      half: {
        menu: {
          chapatis: 2,
          vegetable: "Bhindi Masala",
          dal: 1,
          rice: 1
        },
        price: 90
      },
      full: {
        menu: {
          chapatis: 4,
          vegetables: ["Malai Kofta", "Chana Masala"],
          dal: 1,
          rice: 1
        },
        price: 160
      }
    },
    diet: "veg",
    max_order: 15,
    availableTime: "11:30 AM - 2:30 PM",
    allergenInfo: "May contain dairy and gluten",
    image: "/api/placeholder/300/200",
    deliveryOptions: ["pickup", "delivery"],
    rating: 4.5
  },
  {
    _id: "t3",
    user: { _id: "u3", name: "Meera's Home Food", address: "789 Tagore Lane" },
    tiffin: {
      half: {
        menu: {
          chapatis: 2,
          vegetable: "Jeera Aloo",
          dal: 1,
          rice: 1
        },
        price: 85
      },
      full: {
        menu: {
          chapatis: 4,
          vegetables: ["Baingan Bharta", "Matar Paneer"],
          dal: 1,
          rice: 1
        },
        price: 155
      }
    },
    diet: "veg",
    max_order: 25,
    availableTime: "12:30 PM - 3:30 PM",
    allergenInfo: "May contain dairy",
    image: "/api/placeholder/300/200",
    deliveryOptions: ["pickup"],
    rating: 4.3
  },
  {
    _id: "t4",
    user: { _id: "u4", name: "Mumbai Tiffins", address: "101 Marine Drive" },
    tiffin: {
      half: {
        menu: {
          chapatis: 2,
          vegetable: "Chicken Curry",
          dal: 1,
          rice: 1
        },
        price: 100
      },
      full: {
        menu: {
          chapatis: 4,
          vegetables: ["Butter Chicken", "Egg Curry"],
          dal: 1,
          rice: 1
        },
        price: 180
      }
    },
    diet: "non-veg",
    max_order: 10,
    availableTime: "1:00 PM - 4:00 PM",
    allergenInfo: "Contains chicken, eggs and dairy",
    image: "/api/placeholder/300/200",
    deliveryOptions: ["pickup", "delivery"],
    rating: 4.8
  }
];

const CustomerPage = () => {
  const [tiffins, setTiffins] = useState([]);
  const [selectedTiffin, setSelectedTiffin] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    size: "",
    selectedVegetable: "",
    quantity: 1,
    deliveryMethod: "",
    totalPrice: 0
  });
  const [orderStep, setOrderStep] = useState(0); // 0: Browse, 1: Select Size, 2: Customize, 3: Delivery, 4: Payment
  
  useEffect(() => {
    // Simulate fetching data from API
    setTiffins(tempTiffins);
  }, []);

  const handleSelectTiffin = (tiffin) => {
    setSelectedTiffin(tiffin);
    setOrderStep(1);
    // Reset order details when selecting a new tiffin
    setOrderDetails({
      size: "",
      selectedVegetable: "",
      quantity: 1,
      deliveryMethod: "",
      totalPrice: 0
    });
  };

  const handleSizeSelect = (size) => {
    const price = size === "half" 
      ? selectedTiffin.tiffin.half.price 
      : selectedTiffin.tiffin.full.price;
    
    setOrderDetails({
      ...orderDetails,
      size,
      totalPrice: price * orderDetails.quantity,
      selectedVegetable: size === "half" ? selectedTiffin.tiffin.half.menu.vegetable : selectedTiffin.tiffin.full.menu.vegetables[0]
    });
    setOrderStep(2);
  };

  const handleVegetableSelect = (vegetable) => {
    setOrderDetails({
      ...orderDetails,
      selectedVegetable: vegetable
    });
  };

  const handleQuantityChange = (value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    const basePrice = orderDetails.size === "half" 
      ? selectedTiffin.tiffin.half.price 
      : selectedTiffin.tiffin.full.price;
    
    setOrderDetails({
      ...orderDetails,
      quantity,
      totalPrice: basePrice * quantity
    });
  };

  const handleDeliveryMethod = (method) => {
    setOrderDetails({
      ...orderDetails,
      deliveryMethod: method
    });
    setOrderStep(4);
  };

  const handlePlaceOrder = () => {
    // Here you would normally make an API call to create the order
    console.log("Order placed:", {
      tiffin: selectedTiffin._id,
      size: orderDetails.size,
      quantity: orderDetails.quantity,
      deliveryMethod: orderDetails.deliveryMethod,
      totalPrice: orderDetails.totalPrice,
      selectedVegetable: orderDetails.selectedVegetable
    });
    
    // Reset state
    alert("Order placed successfully!");
    setSelectedTiffin(null);
    setOrderStep(0);
    setOrderDetails({
      size: "",
      selectedVegetable: "",
      quantity: 1,
      deliveryMethod: "",
      totalPrice: 0
    });
  };

  const handleCancel = () => {
    setSelectedTiffin(null);
    setOrderStep(0);
    setOrderDetails({
      size: "",
      selectedVegetable: "",
      quantity: 1,
      deliveryMethod: "",
      totalPrice: 0
    });
  };

  // Render tiffin cards for browsing
  const renderTiffinCards = () => {
    return tiffins.map(tiffin => (
      <div key={tiffin._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow">
        <div className="relative">
          <img src={tiffin.image} alt={`${tiffin.user.name}'s Tiffin`} className="w-full h-48 object-cover" />
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white ${tiffin.diet === "veg" ? "bg-green-600" : "bg-red-600"}`}>
            {tiffin.diet === "veg" ? <Leaf size={16} className="inline mr-1" /> : <Drumstick size={16} className="inline mr-1" />}
            {tiffin.diet === "veg" ? "Veg" : "Non-Veg"}
          </div>
          <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold text-white bg-orange-600 flex items-center">
            <Star size={14} className="inline mr-1" fill="white" /> {tiffin.rating}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-orange-800">{tiffin.user.name}</h3>
          </div>
          
          <div className="text-gray-600 text-sm mb-2 flex items-center">
            <MapPin size={14} className="inline mr-1 text-orange-500" /> {tiffin.user.address}
          </div>
          
          <div className="mb-4">
            <div className="text-gray-700 text-sm mb-1 flex items-center">
              <Clock size={14} className="inline mr-1 text-orange-500" /> {tiffin.availableTime}
            </div>
            <div className="text-gray-700 text-sm flex items-center">
              <AlertTriangle size={14} className="inline mr-1 text-orange-500" /> 
              <span className="truncate">{tiffin.allergenInfo}</span>
            </div>
          </div>
          
          <div className="border-t border-orange-200 pt-3 mb-3">
            <div className="flex justify-between mb-2">
              <div className="text-sm">
                <span className="font-semibold text-orange-700">Half:</span> ₹{tiffin.tiffin.half.price}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-orange-700">Full:</span> ₹{tiffin.tiffin.full.price}
              </div>
            </div>
            
            <div className="text-sm mb-1">
              <span className="font-semibold text-orange-700">Half menu:</span> {tiffin.tiffin.half.menu.chapatis} chapatis, {tiffin.tiffin.half.menu.vegetable}
            </div>
            
            <div className="text-sm">
              <span className="font-semibold text-orange-700">Full menu:</span> {tiffin.tiffin.full.menu.chapatis} chapatis, {tiffin.tiffin.full.menu.vegetables.join(", ")}
            </div>
          </div>
          
          <button 
            onClick={() => handleSelectTiffin(tiffin)}
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
          >
            <ShoppingCart size={16} className="mr-2" /> Order Now
          </button>
        </div>
      </div>
    ));
  };

  // Render order steps when a tiffin is selected
  const renderOrderProcess = () => {
    switch (orderStep) {
      case 1: // Select size
        return (
          <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
            <h2 className="text-xl font-bold mb-4 text-orange-800">Select Tiffin Size</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button 
                className={`p-4 border rounded-lg ${orderDetails.size === 'half' ? 'bg-orange-50 border-orange-500' : 'border-gray-300'}`}
                onClick={() => handleSizeSelect('half')}
              >
                <h3 className="font-bold mb-2 text-orange-700">Half Tiffin - ₹{selectedTiffin.tiffin.half.price}</h3>
                <img src="/api/placeholder/300/100" alt="Half Tiffin" className="w-full h-24 object-cover rounded mb-3" />
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  <li>{selectedTiffin.tiffin.half.menu.chapatis} Chapatis</li>
                  <li>1 Vegetable: {selectedTiffin.tiffin.half.menu.vegetable}</li>
                  <li>{selectedTiffin.tiffin.half.menu.dal} Dal</li>
                  <li>{selectedTiffin.tiffin.half.menu.rice} Rice</li>
                </ul>
              </button>
              
              <button 
                className={`p-4 border rounded-lg ${orderDetails.size === 'full' ? 'bg-orange-50 border-orange-500' : 'border-gray-300'}`}
                onClick={() => handleSizeSelect('full')}
              >
                <h3 className="font-bold mb-2 text-orange-700">Full Tiffin - ₹{selectedTiffin.tiffin.full.price}</h3>
                <img src="/api/placeholder/300/100" alt="Full Tiffin" className="w-full h-24 object-cover rounded mb-3" />
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  <li>{selectedTiffin.tiffin.full.menu.chapatis} Chapatis</li>
                  <li>2 Vegetables: {selectedTiffin.tiffin.full.menu.vegetables.join(", ")}</li>
                  <li>{selectedTiffin.tiffin.full.menu.dal} Dal</li>
                  <li>{selectedTiffin.tiffin.full.menu.rice} Rice</li>
                </ul>
              </button>
            </div>
            
            <div className="flex justify-between mt-4">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <X size={16} className="mr-1" /> Cancel
              </button>
            </div>
          </div>
        );
        
      case 2: // Customize order
        return (
          <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
            <h2 className="text-xl font-bold mb-4 text-orange-800">Customize Your Order</h2>

{/* Vegetable selection (only for Half Tiffin) */}
{orderDetails.size === 'half' && (
  <div className="mb-4">
    <h3 className="font-semibold mb-2 text-gray-700">Select Vegetable</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {selectedTiffin.tiffin.full.menu.vegetables.map((veg, idx) => (
        <button
          key={idx}
          onClick={() => handleVegetableSelect(veg)}
          className={`p-3 border rounded-md ${
            orderDetails.selectedVegetable === veg ? 'bg-orange-100 border-orange-500' : 'border-gray-300'
          } hover:bg-orange-50`}
        >
          {veg}
        </button>
      ))}
    </div>
  </div>
)}

{/* Quantity Selection */}
<div className="mb-4">
  <h3 className="font-semibold mb-2 text-gray-700">Select Quantity</h3>
  <input
    type="number"
    min="1"
    value={orderDetails.quantity}
    onChange={(e) => handleQuantityChange(e.target.value)}
    className="border-gray-300 border p-2 rounded-md w-full"
  />
</div>

{/* Total Price */}
<div className="text-lg font-semibold text-orange-700 mb-4">
  Total Price: ₹{orderDetails.totalPrice}
</div>

{/* Next & Cancel */}
<div className="flex justify-between mt-4">
  <button
    onClick={handleCancel}
    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
  >
    <X size={16} className="mr-1" /> Cancel
  </button>
  <button
    onClick={() => setOrderStep(3)}
    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center"
  >
    <ChevronRight size={16} className="mr-1" /> Next
  </button>
</div>
</div>
);
      
case 3: // Delivery Method Selection
return (
  <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
    <h2 className="text-xl font-bold mb-4 text-orange-800">Choose Delivery Method</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {selectedTiffin.deliveryOptions.map((option, idx) => (
        <button
          key={idx}
          onClick={() => handleDeliveryMethod(option)}
          className={`p-4 border rounded-lg ${
            orderDetails.deliveryMethod === option ? 'bg-orange-100 border-orange-500' : 'border-gray-300'
          } hover:bg-orange-50 flex items-center justify-center`}
        >
          {option === 'pickup' ? <Store size={20} className="mr-2" /> : <Home size={20} className="mr-2" />}
          {option === 'pickup' ? 'Pickup' : 'Delivery'}
        </button>
      ))}
    </div>

    <div className="flex justify-between mt-4">
      <button
        onClick={handleCancel}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
      >
        <X size={16} className="mr-1" /> Cancel
      </button>
      <button
        onClick={() => setOrderStep(4)}
        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center"
      >
        <ChevronRight size={16} className="mr-1" /> Next
      </button>
    </div>
  </div>
);

case 4: // Payment & Summary
return (
  <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
    <h2 className="text-xl font-bold mb-4 text-orange-800">Order Summary & Payment</h2>

    <div className="space-y-3 mb-6">
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">Tiffin Provider:</span>
        <span>{selectedTiffin.user.name}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">Size:</span>
        <span>{orderDetails.size.charAt(0).toUpperCase() + orderDetails.size.slice(1)}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">Vegetable:</span>
        <span>{orderDetails.selectedVegetable}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">Quantity:</span>
        <span>{orderDetails.quantity}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-gray-700">Delivery Method:</span>
        <span>{orderDetails.deliveryMethod.charAt(0).toUpperCase() + orderDetails.deliveryMethod.slice(1)}</span>
      </div>
      <div className="flex justify-between text-lg font-bold text-orange-700">
        <span>Total Price:</span>
        <span>₹{orderDetails.totalPrice}</span>
      </div>
    </div>

    <div className="flex justify-between mt-4">
      <button
        onClick={handleCancel}
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center"
      >
        <X size={16} className="mr-1" /> Cancel
      </button>
      <button
        onClick={handlePlaceOrder}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
      >
        <Check size={16} className="mr-1" /> Place Order
      </button>
    </div>
  </div>
);
    
default:
  return null;
}
};

return (
  <div className="container mx-auto p-4 pt-28">
    {orderStep === 0 && (
      <div>
        <h1 className="text-2xl font-bold mb-6 text-orange-800">Available Tiffin Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderTiffinCards()}
        </div>
      </div>
    )}
    {orderStep > 0 && renderOrderProcess()}
  </div>
);
};

export default CustomerPage;
