import React from 'react'



const OrderDetails = ({order}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
    <h4 className="text-xl font-semibold">{order.provider}</h4>
    <p className="text-gray-600">{order.food}</p>
    <p className="text-gray-500 text-sm">Ordered on {order.date}</p>

    {/* Rating & Feedback Options */}
    <div className="flex justify-between mt-4 flex-wrap">
      {/* Rating Stars */}
      <div className="flex items-center space-x-1">
        <span>⭐</span>
        <span>⭐</span>
        <span>⭐</span>
        <span>⭐</span>
        <span>⭐</span>
      </div>

      {/* Feedback Buttons */}
      <div className="flex space-x-2">
        <button className="bg-red-500 text-white px-3 py-1 rounded-lg">
          ❌ Complaint
        </button>
        <button className="bg-green-500 text-white px-3 py-1 rounded-lg">
          👍 Positive
        </button>
      </div>
    </div>
  </div>
  )
}

export default OrderDetails