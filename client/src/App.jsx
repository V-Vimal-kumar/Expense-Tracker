import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import BoardPage from "./pages/BoardPage";
import ListPage from "./pages/ListPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/board/:boardId" element={<BoardPage/>} />
        <Route path="/list/:listId" element={<ListPage/>} />

      </Routes>
    </BrowserRouter>)
}

export default App