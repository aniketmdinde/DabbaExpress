import React from 'react'

const Sidebar = ({selectedTab, setSelectedTab}) => {
  return (
    <div>
     {/* Sidebar */}
     <aside className="w-[150px] bg-gray-100 p-4 space-y-4">
     <button
       className={`w-full p-3 text-lg font-semibold rounded-lg ${
         selectedTab === "search" ? "bg-blue-600 text-white" : "bg-gray-200"
       }`}
       onClick={() => setSelectedTab("search")}
     >
       🔍 Search Food
     </button>
     <button
       className={`w-full p-3 text-lg font-semibold rounded-lg ${
         selectedTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200"
       }`}
       onClick={() => setSelectedTab("history")}
     >
       📜 Order History
     </button>
   </aside>
   </div>
  )
}

export default Sidebar