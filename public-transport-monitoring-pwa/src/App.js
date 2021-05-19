import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <Header />
      <Login />
    </div>
  );
}

export default App;
