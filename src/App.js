import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { SideNav } from "./components/side-nav/SideNav";
import { Home } from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SideNav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
