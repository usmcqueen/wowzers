import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./pages/style.scss";
import postRoutes from "./posts.js";
// import postRoutes from "./routes/posts.js";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

function App() {
  return(
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Single />} />
          <Route path="/write" element={<Write />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />  
      </Routes>
    </Layout>
  );
};

export default App;
