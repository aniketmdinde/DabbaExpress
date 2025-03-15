import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddFood from "./components/provider/AddFood";
import SearchFood from "./components/SearchFood";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
    <Navbar/>

      <Routes>
        {/* Default Landing Page */}
        <Route path="/" element={<h1>Welcome to Food Delivery App</h1>} />

  
          <Route path="/:role/login" element={<Login />} />
          <Route path="/:role/signup" element={<Signup />} />


          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/searchfood" element={<SearchFood />} />
          <Route path="/add-food" element={<AddFood />} />


        {/* Fallback Route for 404 Pages */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
