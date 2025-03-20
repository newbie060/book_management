import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/authContext";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
               <Routes>
                 <Route path="/" element={<HomePage />} />
                 <Route path="/signup" element={<SignUp />} />
                 <Route path="/login" element={<Login />} />
                 <Route
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                <Route path="/dashboard" element={<Dashboard />} />
                </Route>
               </Routes>
            </BrowserRouter>
        </AuthProvider>
         
    )
}

export default App;