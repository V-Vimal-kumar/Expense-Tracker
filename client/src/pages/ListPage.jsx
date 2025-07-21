import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ListPage() {
    const { listId } = useParams();
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ title: "", amount: "", category: "" });
    const [search, setSearch] = useState("");

    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/expenses/${listId}`, {
                withCredentials: true,
            });
            setExpenses(res.data);
        } catch {
            toast.error("Failed to load expenses");
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleChange = (e) => {
        setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
    };

    const createExpense = async () => {
        if (!newExpense.title || !newExpense.amount) return;

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/expenses`,
                { ...newExpense, listId },
                { withCredentials: true }
            );
            setExpenses([...expenses, res.data]);
            setNewExpense({ title: "", amount: "", category: "" });
            toast.success("Expense added");
        } catch {
            toast.error("Failed to add expense");
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/expenses/${id}`, {
                withCredentials: true,
            });
            setExpenses(expenses.filter((e) => e._id !== id));
            toast.success("Expense deleted");
        } catch {
            toast.error("Delete failed");
        }
    };

    const updateExpense = async (id) => {
        const newTitle = prompt("Update expense name:");
        const newAmount = prompt("Update amount:");

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/expenses/${id}`,
                { title: newTitle, amount: newAmount },
                { withCredentials: true }
            );
            setExpenses(expenses.map((e) => (e._id === id ? res.data : e)));
            toast.success("Expense updated");
        } catch {
            toast.error("Update failed");
        }
    };

    const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const filtered = expenses.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
    );

    const pieData = [];

    const categoryMap = {};

    filtered.forEach((e) => {
        const cat = e.category || "Uncategorized";
        categoryMap[cat] = (categoryMap[cat] || 0) + Number(e.amount);
    });

    for (const cat in categoryMap) {
        pieData.push({ name: cat, value: categoryMap[cat] });
    }


    return (
        <div className="list-page">
            <h2>Expenses💸</h2>

            <div className="expense-input">
                <input
                    name="title"
                    placeholder="Title"
                    value={newExpense.title}
                    onChange={handleChange}
                />
                <input
                    name="amount"
                    type="number"
                    placeholder="Amount"
                    value={newExpense.amount}
                    onChange={handleChange}
                />
                <input
                    name="category"
                    placeholder="Category"
                    value={newExpense.category}
                    onChange={handleChange}
                />
                <button onClick={createExpense}>Add</button>
            </div>

            <input
                className="search-input"
                placeholder="Search expenses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <p>Total Spending: ₹{total}</p>

            <div className="expense-list">
                {filtered.map((e) => (
                    <div className="expense-card" key={e._id}>
                        <h4>{e.title} - ₹{e.amount}</h4>
                        <p>{e.category}</p>
                        <button onClick={() => updateExpense(e._id)}>Edit</button>
                        <button onClick={() => deleteExpense(e._id)}>Delete</button>
                    </div>
                ))}


            </div>
            <h3>Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

        </div>
    );
}
