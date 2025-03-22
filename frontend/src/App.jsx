import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import AddCategory from "./components/Category/AddCategory";
import { useSelector } from "react-redux";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";

function App() {
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);

  return (
    <BrowserRouter>
      {/* Navbar */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/update-category/:id" element={<UpdateCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
