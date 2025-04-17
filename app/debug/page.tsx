"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DebugPage() {
  const [consoleErrorLogs, setConsoleErrorLogs] = useState<any[]>([]);
  const [errorLogs, setErrorLogs] = useState<any[]>([]);
  const [userAgent, setUserAgent] = useState('');
  
  useEffect(() => {
    // Load logs from localStorage
    try {
      const consoleErrors = JSON.parse(localStorage.getItem('console_error_logs') || '[]');
      const errors = JSON.parse(localStorage.getItem('error_logs') || '[]');
      
      setConsoleErrorLogs(consoleErrors);
      setErrorLogs(errors);
      setUserAgent(navigator.userAgent);
    } catch (e) {
      console.error('Failed to load logs:', e);
    }
  }, []);
  
  const clearLogs = () => {
    try {
      localStorage.removeItem('console_error_logs');
      localStorage.removeItem('error_logs');
      setConsoleErrorLogs([]);
      setErrorLogs([]);
    } catch (e) {
      console.error('Failed to clear logs:', e);
    }
  };
  
  const copyLogsToClipboard = () => {
    try {
      const logData = {
        userAgent,
        consoleErrorLogs,
        errorLogs,
        timestamp: new Date().toISOString()
      };
      
      navigator.clipboard.writeText(JSON.stringify(logData, null, 2));
      alert('Logs copied to clipboard');
    } catch (e) {
      console.error('Failed to copy logs:', e);
      alert('Failed to copy logs: ' + e);
    }
  };
  
  return (
    <div className="p-4 bg-darker min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl text-primary font-display mb-2">Debug Console</h1>
          <p className="mb-4">View client-side error logs collected in localStorage</p>
          
          <div className="flex gap-4 mb-4">
            <Link 
              href="/"
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
            >
              Return to Home
            </Link>
            
            <button 
              onClick={clearLogs}
              className="px-4 py-2 bg-red-900 rounded hover:bg-red-800"
            >
              Clear Logs
            </button>
            
            <button 
              onClick={copyLogsToClipboard}
              className="px-4 py-2 bg-primary text-black rounded hover:bg-primary/80"
            >
              Copy All Logs
            </button>
          </div>
          
          <div className="p-3 bg-black/30 rounded text-sm font-mono mb-6 overflow-x-auto">
            <p>{userAgent}</p>
          </div>
        </header>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Console Error Logs */}
          <section>
            <h2 className="text-xl text-primary font-display mb-2">Console Error Logs ({consoleErrorLogs.length})</h2>
            
            {consoleErrorLogs.length === 0 ? (
              <p className="italic text-gray-400">No console error logs found</p>
            ) : (
              <div className="space-y-4">
                {consoleErrorLogs.map((log, index) => (
                  <div key={index} className="p-3 bg-black/30 rounded">
                    <p className="text-xs text-gray-400 mb-1">{log.timestamp}</p>
                    <div className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                      {log.error.map((item: string, i: number) => (
                        <div key={i} className="mb-1">{item}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
          
          {/* Error Boundary Logs */}
          <section>
            <h2 className="text-xl text-primary font-display mb-2">Error Boundary Logs ({errorLogs.length})</h2>
            
            {errorLogs.length === 0 ? (
              <p className="italic text-gray-400">No error boundary logs found</p>
            ) : (
              <div className="space-y-4">
                {errorLogs.map((log, index) => (
                  <div key={index} className="p-3 bg-black/30 rounded">
                    <p className="text-xs text-gray-400 mb-1">{log.time}</p>
                    <p className="font-bold mb-1">{log.errorMessage}</p>
                    <div className="mb-3">
                      <p className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                        {log.errorStack}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                        {log.componentStack}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
} 