import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(formData.password !== formData.confirmPassword) {
            setError("Password do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username: formData.username,
                    password: formData.password,
                    role: formData.role,
                }
            );

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return(
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#000032e6] to-[#ffffff33]'>
            <div className='bg-[#ecdfed] p-8 rounded-lg shadow-lg w-96'>
                <h1 className='text-2xl font-medium mb-6 text-center'>
                    SignUp to CSIT VAULT
                </h1>
                {error && (
                    <div className='p-3 mb-4 rounded'>{error}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Username</label>
                        <input 
                            type="text" 
                            value={formData.username}
                            onChange={(e) =>
                                setFormData({ ...formData, username: e.target.value})
                            }
                            className="w-full p-2 rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                    <label className='block text-sm font-medium mb-1'>Password</label>
                        <input 
                            type="password" 
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value})
                            }
                            className="w-full p-2 rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                    <label className='block text-sm font-medium mb-1'>Confirm Password</label>
                        <input 
                            type="password" 
                            value={formData.confirmPassword}
                            onChange={(e) =>
                                setFormData({ ...formData, confirmPassword: e.target.value})
                            }
                            className="w-full p-2 rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                    <label className='block text-sm font-medium mb-1'>Role</label>
                    <select
                            value={formData.role}
                            onChange={(e) =>
                                setFormData({ ...formData, role: e.target.value})
                            }
                            className="w-full p-2 rounded border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                            <option value="user">User</option>
                            <option value="author">Author</option>
                            <option value="admin">Admin</option>
                    </select>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-3'
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-800">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:text-blue-400">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp