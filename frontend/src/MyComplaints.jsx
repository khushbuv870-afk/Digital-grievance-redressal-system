import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  PlusIcon, DocumentTextIcon, MagnifyingGlassIcon, Squares2X2Icon 
} from "@heroicons/react/24/outline";

function MyComplaints() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Status');
  const [complaints, setComplaints] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/complaints'); 
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Admin Status Update Function
  const handleStatusChange = async (id, newStatus) => {
    try {
      const formData = new FormData();
      formData.append("status", newStatus);
      formData.append("remark", "Status updated by admin");
      
      await axios.post(`http://localhost:8000/api/admin/update-status/${id}`, formData);
      fetchData(); // Data refresh karein
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status");
    }
  };

  const stats = [
    { label: "Total", val: complaints.length },
    { label: "Pending", val: complaints.filter(c => c.status === "Pending").length },
    { label: "In Progress", val: complaints.filter(c => c.status === "In Progress").length },
    { label: "Resolved", val: complaints.filter(c => c.status === "Resolved").length }
  ];

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.complaint_id.toString().includes(searchTerm);
    const matchesFilter = filter === 'All Status' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col fixed h-full">
        <div className="text-xl font-bold mb-10 flex items-center gap-2 text-blue-600">🛡️ Digital Grievance</div>
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl"><Squares2X2Icon className="w-5 h-5"/> Dashboard</Link>
          <Link to="/submit" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl"><PlusIcon className="w-5 h-5"/> Submit Complaint</Link>
          <Link to="/my-complaints" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-bold"><DocumentTextIcon className="w-5 h-5"/> My Complaints</Link>
          <Link to="/track" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl"><MagnifyingGlassIcon className="w-5 h-5"/> Track</Link>
        </nav>
      </div>

      <div className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">My Complaints</h2>
          
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-2xl font-black text-gray-900">{stat.val}</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 flex gap-3 border-b border-gray-50 items-center">
              <input 
                type="text" 
                placeholder="Search..." 
                className="flex-1 p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2.5 border border-gray-100 rounded-xl text-xs font-semibold text-gray-600 bg-gray-50 cursor-pointer outline-none">
                <option>All Status</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Status (Admin Update)</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredComplaints.map((c) => (
                  <tr key={c.complaint_id}>
                    <td className="p-4 font-bold">{c.complaint_id}</td>
                    <td className="p-4">{c.title}</td>
                    <td className="p-4">
                      <select 
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.complaint_id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border cursor-pointer ${getStatusStyle(c.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="p-4 text-gray-500">🗓️ {new Date(c.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComplaints;