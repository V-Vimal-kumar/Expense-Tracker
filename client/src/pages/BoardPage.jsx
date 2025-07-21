import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BoardPage() {
    const { boardId } = useParams();
    const [lists, setLists] = useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const fetchLists = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/lists/${boardId}`, {
                withCredentials: true,
            });
            setLists(res.data);
        } catch {
            toast.error("Failed to load lists");
        }
    };

    const createList = async () => {
        if (!title.trim()) return;
        try {
            const res = await axios.post(
                `http://localhost:5000/api/lists`,
                { title, boardId },
                { withCredentials: true }
            );
            setLists([...lists, res.data]);
            setTitle("");
        } catch {
            toast.error("Failed to create list");
        }
    };

    const deleteList = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/lists/${id}`, {
                withCredentials: true,
            });
            setLists(lists.filter((l) => l._id !== id));
            toast.success("List deleted!");
        } catch {
            toast.error("Delete failed");
        }
    };

    const updateList = async (id) => {
        const newTitle = prompt("Enter new title:");
        if (!newTitle) return;

        try {
            const res = await axios.put(
                `http://localhost:5000/api/lists/${id}`,
                { title: newTitle },
                { withCredentials: true }
            );
            setLists(lists.map((l) => (l._id === id ? res.data : l)));
            toast.success("List updated!");
        } catch {
            toast.error("Update failed");
        }
    };


    useEffect(() => {
        fetchLists();
    }, []);

    return (
        <div className="board-page">
            <h2>Lists🗒️</h2>
            <input
                placeholder="List title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={createList}>Add List</button>

            <ul>
                {lists.map((l) => (
                    <li key={l._id} className="list-card">
                        <strong>{l.title}</strong>
                        <div>
                            <button onClick={() => navigate(`/list/${l._id}`)}>Open</button>
                            <button onClick={() => updateList(l._id)}>Edit</button>
                            <button onClick={() => deleteList(l._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}
