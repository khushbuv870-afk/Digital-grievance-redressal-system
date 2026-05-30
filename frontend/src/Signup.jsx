import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [role, setRole] = useState("citizen");
  const [fullName, setFullName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/signup", {
        full_name: fullName,
        email: email,
        password: password,
        role: role
      });
      alert("Account Created! Please Login.");
      navigate('/login');
    } catch (err) {
      setError("Signup failed. Please check your input.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Branding (Aapka original layout) */}
      <div className="w-1/2 bg-blue-600 p-20 text-white flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-8 leading-tight">Join the Movement for Better Governance</h1>
        <p className="text-xl opacity-90 mb-16 max-w-md">Create your account and start making a difference in your community today.</p>
      </div>

      {/* Right Side: Form (Aapka original layout) */}
      <div className="w-1/2 flex flex-col justify-center px-24 bg-white">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 mb-8 font-medium">Start reporting and tracking civic issues</p>

          {error && <p className="text-red-500 text-sm font-bold mb-4 p-3 bg-red-50 rounded-lg">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">I am a...</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50">
                <option value="citizen">Citizen</option>
                <option value="admin">Admin</option>
                <option value="staff">Department Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="John Doe" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min 8 chars, 1 number, 1 special char" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold hover:bg-blue-700 transition">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;