import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

function Dashboard() {
  const { user } = useAuth();

  // State management for tasks, users, and form
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    semester: "",
    author: "",
    pdfUrl: "",

  });
  const [showNewBookForm, setShowNewBookForm] = useState(false);

  useEffect(() => {
    fetchBooks();
    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  const fetchBooks = async () => {
    try {
       const response = await axios.get('http://localhost:5000/tasks/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBooks(response.data.books);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.username}</h1>
          {/* Admin-only create task button */}
          {user?.role === "admin" && (
            <button
              onClick={() => setShowNewBookForm(!showNewBookForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showNewBookForm ? "Cancel" : "Create Task"}
            </button>
          )}
        </div>

        {/* Books display grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-gray-800 border border-gray-700 p-6 rounded-lg"
            >
              {/* Task details */}
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-400 mb-4">{book.description}</p>
              <p className="text-gray-400 mb-4">{book.semester}</p>
              <p className="text-gray-400 mb-4">{book.author}</p>
              <p className="text-gray-400 mb-4">{book.pdfUrl}</p>

              {/* Admin-only delete button */}
                {user?.role === "admin" && (
                  <button
                    onClick={() => deleteTask(book._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                )}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
