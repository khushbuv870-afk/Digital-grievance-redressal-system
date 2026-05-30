import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 border-2 border-blue-600 rounded flex items-center justify-center text-blue-600 font-bold">🛡️</div>
          <span className="text-xl font-bold">Digital Grievance</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-3">Forgot Password?</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          No worries! Enter your email and we'll send you reset instructions.
        </p>

        {/* Form */}
        <form>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 mb-6">
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-blue-600 flex items-center justify-center gap-2">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;