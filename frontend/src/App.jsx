import { Route, Routes } from "react-router-dom";
import Login from "./components/userAuth/Login";
import Signup from "./components/userAuth/Signup";
import AddFood from "./components/provider/AddFood";
import SearchFood from "./components/SearchFood";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar/>

      <Routes>
        {/* Default Landing Page */}
        <Route path="/" element={<h1>Welcome to Food Delivery App</h1>} />

        {/* User Routes */}
        <Route path="/user">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="searchfood" element={<SearchFood />} />

        </Route>

        {/* Provider Routes */}
        <Route path="/provider">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="add-food" element={<AddFood />} />
        </Route>

        {/* Fallback Route for 404 Pages */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;
