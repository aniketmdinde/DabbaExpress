import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import SearchFood from "./SearchFood";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("history"); // Default to Order History

  // Dummy Data for Order History
  const orders = {
    thisWeek: [
      { provider: "Vendor A", food: "Chicken Biryani", date: "March 14" },
      { provider: "Vendor B", food: "Paneer Butter Masala", date: "March 12" },
    ],
    oldOrders: [
      { provider: "Vendor C", food: "Veg Thali", date: "March 5" },
      { provider: "Vendor D", food: "Pasta Alfredo", date: "Feb 28" },
    ],
  };

  return (
    <section className="min-h-screen flex">
      <div className="hidden md:block">

        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      {/* Main Content Area */}
      <main className="w-full p-6">
        {selectedTab === "search" && (
          <SearchFood />
        )}

        {selectedTab === "history" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order History</h2>

            {/* This Week's Orders */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">📅 This Week</h3>
              <div className="space-y-4">
                {orders.thisWeek.map((order, index) => (
                  <OrderDetails key={index} order={order} />
                ))}
              </div>
            </div>

            {/* Old Orders */}
            <div>
              <h3 className="text-lg font-semibold mb-2">📜 Old Orders</h3>
              <div className="space-y-4">
                {orders.oldOrders.map((order, index) => (
                  <OrderDetails key={index} order={order} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </section>
  );
};

// Order Card Component

export default Dashboard;
