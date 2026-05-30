import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Link add kiya
import { 
  ChartBarIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon, 
  PlusIcon, ArrowRightIcon, Squares2X2Icon, DocumentTextIcon, MagnifyingGlassIcon 
} from "@heroicons/react/24/outline";

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, resolved: 0, high: 0 });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const statsRes = await axios.get("http://127.0.0.1:8000/api/dashboard-stats");
        setStats({
          total: statsRes.data.total,
          pending: statsRes.data.pending,
          resolved: statsRes.data.resolved,
          high: statsRes.data.high_priority
        });

        const actRes = await axios.get("http://127.0.0.1:8000/api/recent-activities");
        setActivities(actRes.data);
      } catch (err) { console.error("Error:", err); }
    };
    fetchAllData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Wahi original UI */}
      <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col fixed h-full">
        <div className="text-xl font-bold mb-10 flex items-center gap-2">🛡️ Digital Grievance</div>
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-bold">
            <Squares2X2Icon className="w-5 h-5"/> Dashboard
          </Link>
          <Link to="/submit" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl">
            <PlusIcon className="w-5 h-5"/> Submit Complaint
          </Link>
          <Link to="/my-complaints" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl">
            <DocumentTextIcon className="w-5 h-5"/> My Complaints
          </Link>
          <Link to="/track" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl">
            <MagnifyingGlassIcon className="w-5 h-5"/> Track
          </Link>
        </nav>
      </div>

      {/* Main Content - Wahi original UI */}
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, John! Here's your complaint overview.</p>
          </div>
          {/* Button Link Fix */}
          <Link to="/submit" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-700 shadow-sm">
            <PlusIcon className="w-5 h-5" /> Submit New Complaint
          </Link>
        </div>

        {/* Stats Cards - Wahi original UI */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Complaints", val: stats.total, icon: <ChartBarIcon />, color: "bg-blue-50 text-blue-600" },
            { label: "Pending", val: stats.pending, icon: <ClockIcon />, color: "bg-orange-50 text-orange-600" },
            { label: "Resolved", val: stats.resolved, icon: <CheckCircleIcon />, color: "bg-green-50 text-green-600" },
            { label: "High Priority", val: stats.high, icon: <ExclamationTriangleIcon />, color: "bg-red-50 text-red-600" },
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>{React.cloneElement(s.icon, {className: "w-6 h-6"})}</div>
              <h2 className="text-3xl font-bold">{s.val}</h2>
              <p className="text-sm text-gray-500 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity & Quick Actions - Wahi original UI */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <button className="text-blue-600 font-semibold flex items-center gap-1">View All <ArrowRightIcon className="w-4 h-4" /></button>
            </div>
            {activities.map((act) => (
              <div key={act.complaint_id} className="border border-gray-100 rounded-xl p-5 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{act.title}</span>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{act.status}</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{act.category} • {new Date(act.created_at).toLocaleTimeString()}</p>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-2" style={{ width: "65%" }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link to="/submit" className="w-full text-left p-4 border rounded-xl hover:bg-gray-50 font-medium block">📄 Submit Complaint</Link>
              <Link to="/track" className="w-full text-left p-4 border rounded-xl hover:bg-gray-50 font-medium block">📄 Track Complaint</Link>
              <Link to="/my-complaints" className="w-full text-left p-4 border rounded-xl hover:bg-gray-50 font-medium block">📄 View All Complaints</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;