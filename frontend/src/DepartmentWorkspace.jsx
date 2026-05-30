import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Clock, CheckCircle2, AlertCircle, ChevronDown, Home } from 'lucide-react';

function DepartmentWorkspace() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All Tasks');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Backend API Endpoint se infrastructure database load krna
  useEffect(() => {
    const fetchDepartmentTasks = async () => {
      try {
        setLoading(false); 
        const response = await axios.get('http://localhost:8000/api/complaints');
        
        // Infrastructure Department filters stream
        const infraTasks = response.data.filter(
          c => c.department?.toLowerCase() === 'infrastructure department' || c.department?.toLowerCase() === 'infrastructure'
        );
        setComplaints(infraTasks);
        setFilteredComplaints(infraTasks); // Initial population
        setError('');
      } catch (err) {
        console.error("API streaming connection interrupted:", err);
        setError('Failed to load real-time database. Displaying local fallback buffer.');
        
        const fallbackData = [
          { ticketId: "GRV-2024-1847", title: "Street light not working on Main Street", name: "John Doe", priority: "High", status: "In Progress", location: "Main Street & Oak Ave", date: "May 13" },
          { ticketId: "GRV-2024-1842", title: "Pothole on Main Street", name: "Jane Smith", priority: "High", status: "Assigned", location: "Main Street, Block 5", date: "May 11" },
          { ticketId: "GRV-2024-1838", title: "Broken sidewalk panel", name: "Bob Johnson", priority: "Medium", status: "Assigned", location: "Oak Avenue", date: "May 12" }
        ];
        setComplaints(fallbackData);
        setFilteredComplaints(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentTasks();
  }, []);

  // 2. Multi-Filter Rule Logic Matrix Engine (Figma Setup Matching)
  useEffect(() => {
    let result = [...complaints];
    
    if (selectedFilter === 'Assigned') {
      result = complaints.filter(c => c.status?.toLowerCase() === 'assigned');
    } else if (selectedFilter === 'In Progress') {
      result = complaints.filter(c => c.status?.toLowerCase() === 'in progress');
    } else if (selectedFilter === 'High Priority') {
      result = complaints.filter(c => c.priority?.toLowerCase() === 'high');
    }
    
    setFilteredComplaints(result);
  }, [selectedFilter, complaints]);

  // Real-Time Analytics Dashboard counters
  const assignedCount = complaints.length;
  const inProgressCount = complaints.filter(c => c.status?.toLowerCase() === 'in progress').length;
  const completedCount = complaints.filter(c => c.status?.toLowerCase() === 'resolved' || c.status?.toLowerCase() === 'completed').length;
  const highPriorityCount = complaints.filter(c => c.priority?.toLowerCase() === 'high').length;

  const stats = [
    { label: "Assigned to Me", value: assignedCount, icon: LayoutDashboard, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "In Progress", value: inProgressCount, icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Completed Today", value: completedCount, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
    { label: "High Priority", value: highPriorityCount, icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-50 text-red-600';
      case 'medium': return 'bg-amber-50 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'in progress': return 'bg-blue-50 text-blue-600';
      case 'assigned': return 'bg-purple-50 text-purple-600';
      case 'resolved':
      case 'completed': return 'bg-emerald-50 text-emerald-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFBFC] text-xs font-bold text-gray-400 uppercase tracking-widest">
        Syncing department workspace infrastructure...
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#FAFBFC] min-h-screen">
      
      {/* Upper Title Section + Action Button Block */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-950 tracking-tight">Department Workspace</h2>
          <p className="text-gray-400 text-sm mt-1">Manage and resolve complaints assigned to Infrastructure Department</p>
        </div>
        
        {/* Right Aligned Back to Home Button Component */}
        <button 
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow"
        >
          <Home size={15} strokeWidth={2.5} className="text-gray-500" />
          Back to Home
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-2xl font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Grid Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon; 
          return (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start justify-between transition-all hover:shadow-md duration-200">
              <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">{s.label}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{s.value}</h3>
              </div>
              <div className={`p-3 rounded-2xl ${s.bg} ${s.color}`}>
                <Icon size={22} strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Container Card */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        
        {/* Header Block containing Title & Selector Element */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 text-lg tracking-tight">My Assigned Tasks</h3>
          
          {/* Custom Stylized Selector Component */}
          <div className="relative inline-block">
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="appearance-none bg-[#F4F5F7] text-gray-800 text-xs font-bold py-2.5 pl-4 pr-10 rounded-xl border-none outline-none cursor-pointer hover:bg-gray-200/80 transition-colors"
            >
              <option value="All Tasks">All Tasks</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="High Priority">High Priority</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">
              <ChevronDown size={14} strokeWidth={2.5} />
            </div>
          </div>
        </div>
        
        {/* Interactive Responsive Table view */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 text-[10px] font-bold uppercase tracking-wider border-b border-gray-100">
                <th className="pb-4 pl-2">Ticket ID</th>
                <th className="pb-4">Title</th>
                <th className="pb-4 text-center">Priority</th>
                <th className="pb-4 text-center">Status</th>
                <th className="pb-4">Location</th>
                <th className="pb-4">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((t, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 pl-2 font-bold text-sm text-gray-900 tracking-tight">
                      {t.ticketId || `GRV-2026-${1000 + i}`}
                    </td>
                    <td className="py-5 text-sm text-gray-600 max-w-xs">
                      <div className="font-semibold text-gray-900 line-clamp-1">{t.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{t.name || 'Citizen User'}</div>
                    </td>
                    <td className="py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide inline-block ${getPriorityStyle(t.priority)}`}>
                        {t.priority || 'Medium'}
                      </span>
                    </td>
                    <td className="py-5 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide inline-block ${getStatusStyle(t.status)}`}>
                        {t.status || 'Assigned'}
                      </span>
                    </td>
                    <td className="py-5 text-sm text-gray-500 font-medium">
                      <span className="inline-block mr-1 text-red-400/90">📍</span> {t.location || 'Not Specified'}
                    </td>
                    <td className="py-5 text-sm text-gray-500 font-bold tracking-tight">
                      {t.date ? t.date : new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    No items match the "{selectedFilter}" scope.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default DepartmentWorkspace;