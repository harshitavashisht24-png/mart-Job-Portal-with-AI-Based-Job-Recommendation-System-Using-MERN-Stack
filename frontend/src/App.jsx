import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import AdminDashboard from "./pages/AdminDashboard";
import MyApplications from "./pages/MyApplications";
import ResumeUpload from "./pages/ResumeUpload";
import Recommendations from "./pages/Recommendations";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/my-applications"
              element={<MyApplications />}
            />
            <Route
              path="/upload-resume"
              element={<ResumeUpload />}
            />
            <Route
              path="/recommendations"
              element={<Recommendations />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  
  );
}

export default App;