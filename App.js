import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
    <Navbar/>
    <div className="app-container">
      <Outlet />
    </div>
    </>
    
  );
}

export default App;
