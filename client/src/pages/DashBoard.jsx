import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();

  const fetchBoards = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/boards", {
        withCredentials: true,
      });
      setBoards(res.data);
    } catch (err) {
      toast.error("Failed to fetch boards");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

//create
  const createBoard = async () => {
    if (!title.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/boards",
        { title },
        { withCredentials: true }
      );
      setBoards([...boards, res.data]);
      setTitle("");
      toast.success("Board created!");
    } catch {
      toast.error("Failed to create board");
    }
  };

//update
  const updateBoard = async (id) => {
  const newTitle = prompt("Enter new title:");
  if (!newTitle) return;

  try {
    const res = await axios.put(
      `http://localhost:5000/api/boards/${id}`,
      { title: newTitle },
      { withCredentials: true }
    );

    setBoards(boards.map((b) => (b._id === id ? res.data : b)));
    toast.success("Board updated!");
  } catch {
    toast.error("Failed to update board");
  }
};

//delete
  const deleteBoard = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/boards/${id}`, {
      withCredentials: true,
    });
    setBoards(boards.filter((b) => b._id !== id));
    toast.success("Board deleted!");
  } catch {
    toast.error("Failed to delete board");
  }
};

  return (
    <div className="dashboard">

  <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
      <div className={`toggle-track ${darkMode ? "dark" : "light"}`}>
        <div className="toggle-thumb" />
      </div>
      <span>{darkMode ? "🌙" : "🌞"}</span>
    </div>

      <h2>Welcome {user?.name || "Cheif !"} 👋</h2>

      <div className="board-input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter board title"
        />
        <button onClick={createBoard}>Add Board</button>
      </div>

      <div className="board-list">
        {boards.length === 0 ? (
          <p>No boards yet</p>
        ) : (
          boards.map((b) => (
            <div key={b._id} className="board-card"  onClick={() => navigate(`/board/${b._id}`)}>
              <h3>{b.title}</h3>
                <button onClick={() => updateBoard(b._id)}>Edit</button>
                <button onClick={() => deleteBoard(b._id)}>Delete</button>
            </div>
            
          ))
        )}
        {/* <button onClick={logout}>Logout</button> */}
      </div>
    </div>
  );
}
