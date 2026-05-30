import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Success message auto-hide logic
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must be 8+ chars, include a number and a special character.");
      return;
    }

    setSuccess("Login Successful! Redirecting...");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);

    setTimeout(() => {
      if (role === "admin") {
        navigate('/admin/dashboard');
      } else if (role === "staff") {
        navigate('/staff/workspace');
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Form */}
      <div className="w-1/2 flex flex-col justify-center px-20">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xl">🛡️</div>
            <span className="text-2xl font-bold tracking-tight">Digital Grievance</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-3">Welcome Back</h2>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        {/* Messages */}
        {error && <p className="text-red-500 text-sm font-bold mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}
        {success && <p className="text-green-600 text-sm font-bold mb-4 p-3 bg-green-50 rounded-lg">{success}</p>}

        <form onSubmit={handleLogin} className="max-w-md w-full">
          <label className="block text-sm font-semibold mb-2">Login as</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-4 border rounded-xl mb-6 bg-gray-50 focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="citizen">Citizen</option>
            <option value="admin">Admin</option>
            <option value="staff">Department Staff</option>
          </select>

          <label className="block text-sm font-semibold mb-2">Email Address</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="you@example.com" 
            className="w-full p-4 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-600 outline-none" 
          />
          
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="Enter your password" 
            className="w-full p-4 border rounded-xl mb-6 focus:ring-2 focus:ring-blue-600 outline-none" 
          />
          
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="w-4 h-4" /> Remember me</label>
            <Link to="/forgot-password" className="text-blue-600 font-semibold hover:underline">Forgot password?</Link>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          
          <p className="text-center mt-6 text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create Account</Link>
          </p>
        </form>
      </div>

      {/* Right Side: Branding */}
      <div className="w-1/2 bg-blue-600 p-20 text-white flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-8 leading-tight">Your Civic Voice, Amplified</h1>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="text-2xl">✅</div>
            <div>
              <p className="font-bold text-lg">Real-time tracking</p>
              <p className="opacity-80">Monitor your complaint status 24/7</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">✅</div>
            <div>
              <p className="font-bold text-lg">AI-powered routing</p>
              <p className="opacity-80">Complaints reach the right department instantly</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">✅</div>
            <div>
              <p className="font-bold text-lg">Secure & transparent</p>
              <p className="opacity-80">Your data protected with government grade security</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;