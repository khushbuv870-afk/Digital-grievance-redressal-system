import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, MapPin, Bell, BarChart3, Lock } from 'lucide-react';

// Components Imports
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Dashboard from './Dashboard';
import SubmitComplaint from './SubmitComplaint';
import MyComplaints from './MyComplaints';
import TrackComplaint from './TrackComplaint';
import AdminDashboard from './AdminDashboard';
import AdminLayout from './AdminLayout';
import Analytics from './Analytics';
import DepartmentWorkspace from './DepartmentWorkspace';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const faqRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6 sticky top-0 bg-white/95 backdrop-blur z-50 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-blue-600 p-1.5 rounded-lg text-white"><ShieldCheck size={20} /></div>
          <span>Digital Grievance System</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold text-gray-600">
          <span className="hover:text-black cursor-pointer" onClick={() => scrollToSection(featuresRef)}>Features</span>
          <span className="hover:text-black cursor-pointer" onClick={() => scrollToSection(howItWorksRef)}>How It Works</span>
          <span className="hover:text-black cursor-pointer" onClick={() => scrollToSection(faqRef)}>FAQ</span>
          <span className="hover:text-black cursor-pointer" onClick={() => navigate('/track')}>Track Complaint</span>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">Logout</button>
          ) : (
            <button onClick={() => navigate('/login')} className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">Login</button>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-6xl mx-auto px-10 py-12 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>AI-POWERED GRIEVANCE MANAGEMENT
          </div>
          <h1 className="text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">Your Voice Matters.<br /> Report Issues, Get Results.</h1>
          <p className="text-gray-500 mb-8 max-w-md">A modern, transparent, and efficient platform for citizens to report civic issues and track their resolution in real-time.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/submit')} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition">Report a Grievance</button>
            <button onClick={() => navigate('/track')} className="border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition">Track Existing Complaint</button>
          </div>
        </div>
        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-2xl w-full md:max-w-lg">
          <div className="bg-white/10 p-5 rounded-2xl">
            <p className="text-lg font-semibold leading-snug">Street light not working on Main Street</p>
            <p className="text-sm text-blue-200 mt-2">📍 Downtown, Sector 15</p>
          </div>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <section ref={featuresRef} className="max-w-6xl mx-auto px-10 py-20">
        <h2 className="text-4xl font-extrabold text-center mb-16">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[ 
            { icon: <Zap className="text-blue-600"/>, title: "AI-Powered Classification", desc: "Intelligent system automatically categorizes and routes complaints." }, 
            { icon: <MapPin className="text-green-500"/>, title: "Real-Time Tracking", desc: "Track your complaint status from submission to resolution." }, 
            { icon: <Bell className="text-purple-500"/>, title: "Instant Notifications", desc: "Get notified at every step when your complaint is updated." },
            { icon: <MapPin className="text-orange-500"/>, title: "Location Intelligence", desc: "Pinpoint issues using advanced geospatial data mapping." }, 
            { icon: <BarChart3 className="text-pink-500"/>, title: "Analytics Dashboard", desc: "Deep insights into municipal performance metrics." }, 
            { icon: <Lock className="text-blue-500"/>, title: "Secure & Transparent", desc: "End-to-end encrypted data with full audit trails." }
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all">
              <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={howItWorksRef} className="max-w-6xl mx-auto px-10 py-20 bg-gray-50 rounded-3xl mb-20">
        <h2 className="text-4xl font-extrabold text-center mb-4">How It Works</h2>
        <p className="text-center text-gray-500 mb-16">Simple process from complaint to resolution</p>
        <div className="grid md:grid-cols-4 gap-8">
          {[ 
            { title: "Submit Complaint", desc: "Register and submit your grievance with details and evidence" }, 
            { title: "AI Analysis", desc: "Our AI categorizes and assigns to the appropriate department" }, 
            { title: "Department Action", desc: "Assigned team reviews and takes action on your complaint" }, 
            { title: "Resolution", desc: "Issue resolved and you receive confirmation with proof" } 
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                {i + 1}
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 px-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section ref={faqRef} className="max-w-4xl mx-auto px-10 py-20">
        <h2 className="text-4xl font-extrabold text-center mb-16">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: "How do I track my complaint?", a: "You can track your complaint using the unique ticket ID sent to your email. Just enter it on the Track Complaint page." },
            { q: "How long does it take to resolve a complaint?", a: "Resolution time varies by complaint type and severity. Average resolution time is 48-72 hours for standard complaints." },
            { q: "Can I attach images or documents?", a: "Yes, you can upload photos and documents as evidence when submitting your complaint to help authorities better understand the issue." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg">{item.q}</h3>
              <p className="text-gray-500 text-sm mt-3">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="bg-blue-600 py-20 px-10 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">Ready to Make Your City Better?</h2>
        <p className="text-blue-100 mb-8 max-w-lg mx-auto">Join thousands of citizens making a difference in their communities</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/signup')} className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition">Get Started</button>
          <button onClick={() => navigate('/login')} className="bg-blue-700 text-white px-8 py-3 rounded-xl font-bold border border-blue-500 hover:bg-blue-800 transition">Sign In</button>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-[#0f172a] text-gray-400 py-16 px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <ShieldCheck size={24} /> <span>Digital Grievance</span>
            </div>
            <p className="text-sm">Making civic engagement simple, transparent, and effective.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Contact</li>
              <li>Help Center</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>Twitter</li>
              <li>Facebook</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          © 2026 Digital Grievance Redressal System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitComplaint />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/admin" element={<AdminLayout />}>
           <Route path="dashboard" element={<AdminDashboard />} />
           <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="/staff/workspace" element={<DepartmentWorkspace />} />
      </Routes>
    </Router>
  );
}