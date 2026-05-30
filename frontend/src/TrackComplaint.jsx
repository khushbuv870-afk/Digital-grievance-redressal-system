import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  MagnifyingGlassIcon, CheckCircleIcon, CalendarDaysIcon, TicketIcon,
  PlusIcon, DocumentTextIcon, Squares2X2Icon, UserIcon, TagIcon, ClockIcon
} from "@heroicons/react/24/outline";

function TrackComplaint() {
  const [ticketId, setTicketId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'submitted': return 'border-green-500 text-green-500';
      case 'ai analysis': return 'border-blue-500 text-blue-500';
      case 'department assigned': return 'border-purple-500 text-purple-500';
      case 'under review': return 'border-orange-500 text-orange-500';
      case 'resolved': return 'border-teal-500 text-teal-500';
      default: return 'border-gray-400 text-gray-400';
    }
  };

  const fetchComplaintData = async (searchId) => {
    if (!searchId.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/api/complaints/${searchId.trim()}`);
      setComplaint(res.data);

      try {
        const tRes = await axios.get(`http://localhost:8000/api/complaint-updates/${searchId.trim()}`);
        setTimeline(tRes.data);
      } catch (tErr) {
        console.warn("Timeline not found");
        setTimeline([]); 
      }
    } catch (err) {
      console.error("Complaint ID not found", err);
      alert("Ticket ID not found!");
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-100 p-6 fixed h-full">
        <div className="text-xl font-bold mb-10 flex items-center gap-2 text-blue-600">🛡️ Digital Grievance</div>
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl"><Squares2X2Icon className="w-5 h-5"/> Dashboard</Link>
          <Link to="/submit" className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl"><PlusIcon className="w-5 h-5"/> Submit Complaint</Link>
          <Link to="/my-complaints" className="flex items-center gap-3 text-gray-500 p-3 hover:bg-gray-50 rounded-xl"><DocumentTextIcon className="w-5 h-5"/> My Complaints</Link>
          <Link to="/track" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-bold"><MagnifyingGlassIcon className="w-5 h-5"/> Track</Link>
        </nav>
      </div>

      <div className="flex-1 ml-64 p-8">
        {!complaint ? (
           <div className="max-w-xl mx-auto mt-20 bg-white p-10 rounded-3xl border border-gray-100 shadow-sm text-center">
             <h1 className="text-3xl font-bold mb-2">Track Complaint</h1>
             <input type="text" placeholder="Enter Ticket ID..." value={ticketId} onChange={(e) => setTicketId(e.target.value)} className="w-full p-4 mb-4 bg-gray-50 rounded-xl border border-gray-200" />
             <button onClick={() => fetchComplaintData(ticketId)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Track Complaint</button>
           </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{complaint.title}</h2>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{complaint.status}</span>
                </div>
                <button onClick={() => setComplaint(null)} className="px-6 py-2 border rounded-xl text-sm font-semibold hover:bg-gray-50">Search Another</button>
              </div>
              <div className="flex gap-6 text-sm text-gray-500 border-t pt-6">
                <span className="flex items-center gap-2"><TicketIcon className="w-4 h-4"/> {complaint.complaint_id}</span>
                <span className="flex items-center gap-2"><CalendarDaysIcon className="w-4 h-4"/> {new Date(complaint.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-2 font-bold text-gray-700"><TagIcon className="w-4 h-4"/> {complaint.priority || 'Medium'} Priority</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <div><p className="text-[10px] text-gray-400 uppercase">Category</p><p className="font-semibold">{complaint.category}</p></div>
                  <div><p className="text-[10px] text-gray-400 uppercase">Department</p><p className="font-semibold">Infrastructure</p></div>
                  <div><p className="text-[10px] text-gray-400 uppercase">Assigned To</p><p className="font-semibold flex items-center gap-1"><UserIcon className="w-4 h-4"/> {complaint.assigned_to || 'Pending'}</p></div>
                </div>

                {/* Refined Status Timeline */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold mb-8">Status Timeline</h3>
                  <div className="relative pl-4 space-y-8 border-l-2 border-gray-100">
                    {timeline && timeline.length > 0 ? (
                      timeline.map((step, idx) => (
                        <div key={idx} className="relative pl-6">
                          {/* Connector Dot with dynamic color */}
                          <div className={`absolute -left-[9px] top-0 p-1 bg-white rounded-full border-2 ${getStatusColor(step.status)}`}>
                            <div className={`w-2 h-2 rounded-full bg-current`}></div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">{step.status}</h4>
                            <p className="text-sm text-gray-600 mt-0.5">{step.remark}</p>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase flex items-center gap-1">
                              <ClockIcon className="w-3 h-3"/> {new Date(step.updated_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">No timeline updates available for this ticket.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit">
                <h3 className="font-bold mb-4">Details</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{complaint.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;