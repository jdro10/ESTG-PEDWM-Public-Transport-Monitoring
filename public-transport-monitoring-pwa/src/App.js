import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <div>
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
