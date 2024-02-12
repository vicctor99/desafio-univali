import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="md:flex block min-h-screen min-w-screen h-full">
      <Sidebar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
