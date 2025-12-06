
import React, { useRef, useState } from 'react';
import { Habit } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: Habit[];
  onImport: (habits: Habit[]) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, habits, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    const dataStr = JSON.stringify(habits, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibe_tracker_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setSuccessMsg("Export successful!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsedData = JSON.parse(content);

        // Basic validation
        if (!Array.isArray(parsedData)) {
          throw new Error("Invalid file format: Data must be an array.");
        }
        
        // Check if items look like habits (check for id and title)
        const isValid = parsedData.every(item => item.id && item.title && item.type);
        if (!isValid && parsedData.length > 0) {
          throw new Error("Invalid file format: Missing required habit fields.");
        }

        onImport(parsedData);
        setSuccessMsg("Import successful!");
        setImportError(null);
        setTimeout(() => {
            setSuccessMsg(null);
            onClose();
        }, 1500);
      } catch (err) {
        setImportError("Failed to import: Invalid JSON file.");
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#1E1E1E] w-full max-w-sm rounded-[2rem] p-6 shadow-2xl animate-[fadeIn_0.2s_ease-out] transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Settings & Data</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-zinc-800 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Offline Backup</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Save your progress to a file so you can restore it later if you delete the app.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleExport}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-zinc-800 border-2 border-gray-100 dark:border-zinc-700 hover:border-m3-primary dark:hover:border-m3-dark-primary transition-colors gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-m3-primary dark:text-m3-dark-primary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Export</span>
              </button>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-zinc-800 border-2 border-gray-100 dark:border-zinc-700 hover:border-m3-primary dark:hover:border-m3-dark-primary transition-colors gap-2"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-m3-primary dark:text-m3-dark-primary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Import</span>
              </button>
            </div>
            
            {/* Hidden Input */}
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
            />
          </div>

          {importError && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-xl text-sm text-center">
              {importError}
            </div>
          )}
          
          {successMsg && (
            <div className="p-3 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-300 rounded-xl text-sm text-center">
              {successMsg}
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
           Vibe Tracker v1.1
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
