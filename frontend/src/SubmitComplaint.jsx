import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { 
  PlusIcon, DocumentTextIcon, MagnifyingGlassIcon, Squares2X2Icon,
  CloudArrowUpIcon, TrashIcon, CheckCircleIcon 
} from "@heroicons/react/24/outline";

const SubmitComplaint = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState(""); 
  const [formData, setFormData] = useState({ 
    title: '', category: '', description: '', address: '', landmark: '', files: [] 
  });

  const categories = [
    "Infrastructure", "Water Supply", "Electricity", "Road Maintenance", 
    "Sanitation", "Street Lighting", "Public Safety", "Parks & Recreation", 
    "Noise Pollution", "Other"
  ];

  const onDrop = useCallback((acceptedFiles) => {
    setFormData(prev => ({ ...prev, files: [...prev.files, ...acceptedFiles] }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (index) => {
    setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }));
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFinalSubmit = async () => {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('address', formData.address);
    data.append('landmark', formData.landmark);
    
    // FastAPI/Python में 'files' पैरामीटर के साथ मैच करने के लिए
    formData.files.forEach((file) => {
      data.append('files', file);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/complaints', data);
      setTicketId(response.data.ticketId);
      setIsSubmitted(true); 
    } catch (error) { 
      console.error("Submission Error:", error.response?.data || error);
      alert("Submission failed! Check the console for details."); 
    }
  };

  const Stepper = () => (
    <div className="flex items-center justify-between mb-10 w-full max-w-2xl mx-auto">
      {['Details', 'Location', 'Evidence', 'Review'].map((label, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
            {index + 1}
          </div>
          <span className={`text-xs mt-2 font-semibold ${currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col fixed h-full">
        <div className="text-xl font-bold mb-10 flex items-center gap-2 text-blue-600">🛡️ Digital Grievance</div>
        <nav className="space-y-4">
          <a href="/dashboard" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl"><Squares2X2Icon className="w-5 h-5"/> Dashboard</a>
          <a href="/submit" className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-bold"><PlusIcon className="w-5 h-5"/> Submit Complaint</a>
          <a href="/my-complaints" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl"><DocumentTextIcon className="w-5 h-5"/> My Complaints</a>
          <a href="/track" className="flex items-center gap-3 text-gray-500 p-3 font-medium hover:bg-gray-50 rounded-xl"><MagnifyingGlassIcon className="w-5 h-5"/> Track</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Submit New Complaint</h1>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold">Submitted Successfully!</h2>
                <p>Ticket ID: <span className="font-bold text-blue-600">{ticketId}</span></p>
                <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Submit Another</button>
              </div>
            ) : (
              <>
                <Stepper />
                <div className="mt-8 border-t pt-8">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold">Complaint Details</h2>
                      <input name="title" placeholder="Brief title" value={formData.title} onChange={handleChange} className="w-full p-4 bg-gray-50 border rounded-xl" />
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full p-4 bg-gray-50 border rounded-xl">
                        <option value="">Select a category</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <textarea name="description" placeholder="Details..." value={formData.description} onChange={handleChange} className="w-full p-4 h-32 bg-gray-50 border rounded-xl"></textarea>
                      <button onClick={() => setCurrentStep(2)} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Continue</button>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold">Location Details</h2>
                      <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-4 bg-gray-50 border rounded-xl" />
                      <input name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} className="w-full p-4 bg-gray-50 border rounded-xl" />
                      <div className="flex gap-4">
                        <button onClick={() => setCurrentStep(1)} className="flex-1 bg-gray-100 py-4 rounded-xl font-bold">Back</button>
                        <button onClick={() => setCurrentStep(3)} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold">Continue</button>
                      </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold">Upload Evidence</h2>
                      <div {...getRootProps()} className="border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer border-gray-200">
                        <input {...getInputProps()} />
                        <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-4" />
                        <p>Drop files here or click</p>
                      </div>
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg text-sm">
                          <span>{file.name}</span>
                          <button onClick={() => removeFile(index)}><TrashIcon className="w-5 h-5 text-red-500"/></button>
                        </div>
                      ))}
                      <div className="flex gap-4">
                        <button onClick={() => setCurrentStep(2)} className="flex-1 bg-gray-100 py-4 rounded-xl font-bold">Back</button>
                        <button onClick={() => setCurrentStep(4)} className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold">Continue</button>
                      </div>
                    </div>
                  )}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold">Review & Submit</h2>
                      <button onClick={handleFinalSubmit} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">Submit Final Complaint</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;