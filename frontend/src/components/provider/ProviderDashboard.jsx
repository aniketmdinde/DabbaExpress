import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import {
  ChefHat,
  Package,
  TrendingUp,
  Users,
  Clock,
  Settings,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import KanbanBoard from './KanbanBoard';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [tiffins, setTiffins] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    activeCustomers: 0,
    avgRating: 4.5
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [tiffinRes, orderRes] = await Promise.all([
        axios.get('/api/tiffin'),
        axios.get('/api/order')
      ]);

      setTiffins(tiffinRes.data.tiffins);
      setOrders(orderRes.data.orders);

      // Calculate stats
      const revenue = orderRes.data.orders.reduce((acc, order) => acc + order.totalPrice, 0);
      const uniqueCustomers = new Set(orderRes.data.orders.map(order => order.user)).size;

      setStats({
        totalOrders: orderRes.data.orders.length,
        revenue,
        activeCustomers: uniqueCustomers,
        avgRating: 4.5 // Placeholder - implement actual rating system
      });
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    }
  };

  // Sample data for charts
  const revenueData = [
    { name: 'Mon', revenue: 2400 },
    { name: 'Tue', revenue: 1398 },
    { name: 'Wed', revenue: 9800 },
    { name: 'Thu', revenue: 3908 },
    { name: 'Fri', revenue: 4800 },
    { name: 'Sat', revenue: 3800 },
    { name: 'Sun', revenue: 4300 }
  ];

  const orderStatusData = [
    { name: 'Pending', value: 20 },
    { name: 'Confirmed', value: 15 },
    { name: 'Delivered', value: 35 },
    { name: 'Cancelled', value: 5 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderOverviewTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <Package className="h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-500">Total Orders</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
        <p className="text-green-500 text-sm">+12% from last month</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-500">Revenue</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">₹{stats.revenue}</h3>
        <p className="text-green-500 text-sm">+8% from last month</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <Users className="h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-500">Active Customers</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{stats.activeCustomers}</h3>
        <p className="text-green-500 text-sm">+5% from last month</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <Clock className="h-8 w-8 text-orange-500" />
          <span className="text-sm font-medium text-gray-500">Avg. Rating</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{stats.avgRating}</h3>
        <p className="text-green-500 text-sm">+0.2 from last month</p>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="col-span-full lg:col-span-2 bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <LineChart width={600} height={300} data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#ff6b6b" />
        </LineChart>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="col-span-full lg:col-span-2 bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={orderStatusData}
            cx={200}
            cy={150}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {orderStatusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </motion.div>
    </div>
  );

  const renderTiffinsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Tiffins</h2>
        <Link to={"/provider/create"}>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors">
            <Plus className="h-5 w-5" />
            <span>Add New Tiffin</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiffins.map((tiffin, index) => (
          <motion.div
            key={tiffin._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={tiffin.image || 'https://via.placeholder.com/300x200'}
              alt={`Tiffin ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {tiffin.name || `Tiffin ${index + 1}`}
                  </h3>
                  <p className="text-gray-600">{tiffin.diet}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Half:</span> ₹{tiffin.tiffin.half.price}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Full:</span> ₹{tiffin.tiffin.full.price}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Available:</span> {tiffin.availableTime}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
      <KanbanBoard orders={orders} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Provider Dashboard</h1>
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            <Settings className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          <button
            className={`pb-4 px-4 ${activeTab === 'overview'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-4 px-4 ${activeTab === 'tiffins'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('tiffins')}
          >
            Tiffins
          </button>
          <button
            className={`pb-4 px-4 ${activeTab === 'orders'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'tiffins' && renderTiffinsTab()}
        {activeTab === 'orders' && renderOrdersTab()}
      </div>
    </div>
  );
};

export default ProviderDashboard;