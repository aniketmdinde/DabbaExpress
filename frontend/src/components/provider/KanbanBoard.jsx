import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, TruckIcon } from 'lucide-react';

const KanbanColumn = ({ title, orders, icon: Icon }) => (
  <div className="bg-gray-50 p-4 rounded-lg min-w-[300px]">
    <div className="flex items-center space-x-2 mb-4">
      <Icon className="h-5 w-5 text-gray-600" />
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
        {orders.length}
      </span>
    </div>
    <div className="space-y-3">
      {orders.map((order) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-gray-800">Order #{order._id.slice(-4)}</h4>
            <span className={`px-2 py-1 rounded-full text-xs ${
              order.isPaymentDone ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {order.isPaymentDone ? 'Paid' : 'Pending'}
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Size: {order.size}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total: ₹{order.totalPrice}</p>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
            <div className="flex space-x-2">
              <button className="text-blue-500 hover:text-blue-600">
                <CheckCircle className="h-4 w-4" />
              </button>
              <button className="text-red-500 hover:text-red-600">
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const KanbanBoard = ({ orders }) => {
  const [items, setItems] = useState(orders);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const confirmedOrders = orders.filter((order) => order.status === 'confirmed');
  const deliveredOrders = orders.filter((order) => order.status === 'delivered');

  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-6 p-4 min-w-max">
        <KanbanColumn
          title="Pending Orders"
          orders={pendingOrders}
          icon={Clock}
        />
        <KanbanColumn
          title="Confirmed Orders"
          orders={confirmedOrders}
          icon={CheckCircle}
        />
        <KanbanColumn
          title="Delivered Orders"
          orders={deliveredOrders}
          icon={TruckIcon}
        />
      </div>
    </div>
  );
};

export default KanbanBoard;