import React, { useState } from 'react';
import { Menu, Search, Home, History, MessageSquare, Star, LogOut, ChevronRight } from 'lucide-react';
import CustomerPage from './CustomerPage';

export default function CustomerDashboard() {
  const [activePage, setActivePage] = useState('main');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [rating, setRating] = useState(0);
  
  const tiffinHistory = [
    { id: 1, date: '2025-03-15', menu: 'Paneer Butter Masala, Roti, Rice, Dal', status: 'Delivered', rating: 4 },
    { id: 2, date: '2025-03-14', menu: 'Vegetable Biryani, Raita, Papad', status: 'Delivered', rating: 5 },
    { id: 3, date: '2025-03-13', menu: 'Chole Bhature, Salad', status: 'Delivered', rating: 3 },
    { id: 4, date: '2025-03-12', menu: 'Dal Makhani, Jeera Rice, Naan', status: 'Delivered', rating: 4 },
    { id: 5, date: '2025-03-11', menu: 'Aloo Paratha, Curd, Pickle', status: 'Delivered', rating: 5 },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'main':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Today's Tiffin</h2>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">March 16, 2025</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Delivery Scheduled
                </span>
              </div>
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Menu Items:</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Palak Paneer</li>
                  <li>Butter Naan (2 pcs)</li>
                  <li>Jeera Rice</li>
                  <li>Mixed Vegetable Raita</li>
                  <li>Sweet: Gulab Jamun (1 pc)</li>
                </ul>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Delivery Time</p>
                  <p className="font-medium">12:30 PM</p>
                </div>
                <div>
                  <p className="text-gray-500">Tiffin ID</p>
                  <p className="font-medium">#TIF29845</p>
                </div>
                <div>
                  <p className="text-gray-500">Subscription</p>
                  <p className="font-medium">Daily Plan</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Upcoming Menu</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">March 17, 2025</p>
                    <span className="text-sm text-gray-500">Monday</span>
                  </div>
                  <ul className="text-sm text-gray-600">
                    <li>• Rajma Chawal</li>
                    <li>• Aloo Paratha</li>
                    <li>• Mixed Veg Salad</li>
                    <li>• Sweet: Rasmalai</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">March 18, 2025</p>
                    <span className="text-sm text-gray-500">Tuesday</span>
                  </div>
                  <ul className="text-sm text-gray-600">
                    <li>• Veg Pulao</li>
                    <li>• Dal Tadka</li>
                    <li>• Paneer Tikka</li>
                    <li>• Sweet: Kheer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Tiffin History</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Menu</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tiffinHistory.map((tiffin) => (
                    <tr key={tiffin.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tiffin.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{tiffin.menu}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {tiffin.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < tiffin.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => {
                            setRating(tiffin.rating);
                            setShowFeedbackModal(true);
                          }}
                        >
                          Feedback
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => setShowComplaintModal(true)}
                        >
                          Complaint
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'orders':
        return <CustomerPage/>
      default:
        return <div className="p-6">Page not found</div>;
    }
  };

  const FeedbackModal = () => {
    const [feedbackText, setFeedbackText] = useState('');
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">Provide Feedback</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-2xl focus:outline-none"
                  onClick={() => setRating(star)}
                >
                  <span className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Comments</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 h-24"
              placeholder="Share your experience with this tiffin..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              onClick={() => setShowFeedbackModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={() => {
                alert('Feedback submitted successfully!');
                setShowFeedbackModal(false);
              }}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ComplaintModal = () => {
    const [complaintType, setComplaintType] = useState('');
    const [complaintText, setComplaintText] = useState('');
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">Register Complaint</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Complaint Type</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
            >
              <option value="">Select issue type</option>
              <option value="late-delivery">Late Delivery</option>
              <option value="food-quality">Food Quality Issue</option>
              <option value="missing-item">Missing Item</option>
              <option value="wrong-item">Wrong Item Delivered</option>
              <option value="packaging">Packaging Problem</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Complaint Details</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 h-24"
              placeholder="Please describe your issue in detail..."
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              onClick={() => setShowComplaintModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                alert('Complaint registered successfully! A representative will contact you shortly.');
                setShowComplaintModal(false);
              }}
            >
              Submit Complaint
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white flex flex-col">
        <div className="p-4 flex items-center border-b border-indigo-700">
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
            <span className="text-indigo-800 font-bold">T</span>
          </div>
          <h1 className="text-xl font-bold">Tiffin Service</h1>
        </div>
        
        <div className="overflow-y-auto flex-grow">
          <div className="px-4 py-6">
            <p className="text-sm text-indigo-300 mb-2">BROWSE TIFFIN</p>
            <nav className="space-y-1">
              <button 
                onClick={() => setActivePage('main')}
                className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${activePage === 'main' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
              >
                <Home size={20} className="mr-3" />
                <span>Main Dashboard</span>
              </button>
              <button 
                onClick={() => setActivePage('history')}
                className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${activePage === 'history' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
              >
                <History size={20} className="mr-3" />
                <span>Tiffin History</span>
              </button>
              <button 
                onClick={() => setActivePage('orders')}
                className={`flex items-center px-4 py-3 w-full text-left rounded-lg ${activePage === 'orders' ? 'bg-indigo-900' : 'hover:bg-indigo-700'}`}
              >
                <History size={20} className="mr-3" />
                <span>Exlpore Orders</span>
              </button>
            </nav>
          </div>
          
          <div className="px-4 py-6 border-t border-indigo-700">
            <p className="text-sm text-indigo-300 mb-2">SUPPORT</p>
            <nav className="space-y-1">
              <button 
                onClick={() => setShowComplaintModal(true)}
                className="flex items-center px-4 py-3 w-full text-left rounded-lg hover:bg-indigo-700"
              >
                <MessageSquare size={20} className="mr-3" />
                <span>Complaint</span>
              </button>
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="flex items-center px-4 py-3 w-full text-left rounded-lg hover:bg-indigo-700"
              >
            <History size={20} className="mr-3" />
            <span>Tiffin History</span>
          </button>
        </nav>

        <p className="text-sm text-indigo-300 mt-6 mb-2">SUPPORT</p>
        <nav className="space-y-1">
          <button
            onClick={() => setShowFeedbackModal(true)}
            className="flex items-center px-4 py-3 w-full text-left rounded-lg hover:bg-indigo-700"
          >
            <Star size={20} className="mr-3" />
            <span>Feedback</span>
          </button>
          <button
            onClick={() => setShowComplaintModal(true)}
            className="flex items-center px-4 py-3 w-full text-left rounded-lg hover:bg-indigo-700"
          >
            <MessageSquare size={20} className="mr-3" />
            <span>Complaint</span>
          </button>
        </nav>
      </div>
    </div>

    <button className="flex items-center px-4 py-3 w-full text-left bg-red-700 hover:bg-red-800 rounded-lg mt-auto">
      <LogOut size={20} className="mr-3" />
      <span>Logout</span>
    </button>
  </div>

  {/* Main Content */}
  <div className="flex-1 flex flex-col">
    {/* Header */}
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">Tiffin Dashboard</h2>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          <Search size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          <Menu size={24} />
        </button>
      </div>
    </header>

    {/* Content */}
    <main className="flex-1 overflow-y-auto bg-gray-100 p-6">{renderContent()}</main>
  </div>

  {/* Modals */}
  {showFeedbackModal && <FeedbackModal />}
  {showComplaintModal && <ComplaintModal />}
</div>
  )}