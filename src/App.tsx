import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/AddItems/MainPage";
import AddItems from "./components/__organism/AddItems";

function App() {
  return (
    <div className="w-full h-auto flex items-center justify-center bg-[#FAFAFA] ">
      <MainPage />
    </div>
  );
}

export default App;
