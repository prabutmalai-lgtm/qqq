
import React, { useState } from 'react';
import { ResumeData } from './types';
import { INITIAL_RESUME_DATA } from './constants';
import ResumeTemplate from './components/ResumeTemplate';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'dashboard' | 'resume' | 'editor'>('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'iecw' && password === 'iecw') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid student credentials. Please try again.');
    }
  };

  const handleAiAnalyze = async () => {
    if (!aiPrompt.trim()) return;
    setIsLoading(true);
    try {
      const response = await geminiService.analyzeResume(resumeData, aiPrompt);
      setAiResponse(response);
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("An error occurred while communicating with Gemini. Please ensure your API key is active.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
          <div className="bg-brand-700 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-4 border border-white/30">
              <span className="text-white text-3xl font-black">IECW</span>
            </div>
            <h1 className="text-white text-2xl font-bold">Student Portal</h1>
            <p className="text-brand-100 text-sm mt-1 opacity-80">Empowering future engineers</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            {loginError && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-3 rounded-lg border border-red-100 flex items-center gap-2 animate-bounce">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                {loginError}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="Student ID / iecw"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="Enter password / iecw"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-700 text-white py-4 rounded-xl font-bold text-sm hover:bg-brand-800 active:scale-95 transition-all shadow-lg shadow-brand-200"
            >
              Sign In to Dashboard
            </button>
            
            <p className="text-center text-slate-400 text-xs pt-2">
              Forgot password? Contact admin.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white p-4 border-b border-slate-200 flex justify-between items-center print:hidden">
        <div className="flex items-center gap-2">
           <span className="bg-brand-700 text-white px-2 py-0.5 rounded font-black">IECW</span>
           <span className="font-bold text-slate-700">Student Portal</span>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="text-slate-400 hover:text-red-500">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
        </button>
      </div>

      {/* Sidebar Controls */}
      <aside className="w-full md:w-96 bg-white border-r border-slate-200 flex flex-col sticky top-0 md:h-screen overflow-y-auto z-10 print:hidden">
        <div className="p-8">
          <div className="mb-8 hidden md:block">
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="bg-brand-700 text-white px-2 py-0.5 rounded">IECW</span>
              Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-bold tracking-widest uppercase">Student Success Suite</p>
          </div>

          <div className="space-y-6">
            {/* Nav Tabs */}
            <nav className="flex flex-col gap-2">
              <button 
                onClick={() => setView('dashboard')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${view === 'dashboard' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                Dashboard Home
              </button>
              <button 
                onClick={() => setView('resume')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${view === 'resume' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                Resume Architect
              </button>
              <button 
                onClick={() => setView('editor')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${view === 'editor' ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                Source Editor
              </button>
            </nav>

            {view !== 'dashboard' && (
              <div className="pt-6 border-t border-slate-100 space-y-4 animate-in slide-in-from-left duration-300">
                <button 
                  onClick={handlePrint}
                  className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-brand-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                  Export Resume PDF
                </button>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">AI Personal Coach</label>
                  <textarea
                    className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-brand-500 outline-none resize-none transition-all placeholder:text-slate-400"
                    placeholder="Ex: 'How can I make my project section more impressive for a software role?'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <button
                    onClick={handleAiAnalyze}
                    disabled={isLoading || !aiPrompt.trim()}
                    className="w-full mt-3 bg-brand-700 text-white py-3 rounded-xl text-sm font-bold hover:bg-brand-800 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>}
                    {isLoading ? "Consulting Gemini..." : "Get AI Feedback"}
                  </button>
                </div>

                {aiResponse && (
                  <div className="bg-brand-50 rounded-2xl p-5 text-sm text-brand-900 border border-brand-100 mt-4 overflow-y-auto max-h-64 whitespace-pre-wrap leading-relaxed shadow-inner">
                    <div className="font-black text-brand-800 mb-2 flex items-center gap-2 uppercase tracking-tighter">
                      Coach Feedback
                    </div>
                    {aiResponse}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-auto p-8 border-t border-slate-100">
           <button 
             onClick={() => setIsLoggedIn(false)}
             className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl text-slate-500 hover:text-red-600 transition-colors font-bold text-sm"
           >
             Sign Out
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-12 print:p-0 bg-slate-100">
        {view === 'dashboard' ? (
          <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                   <h2 className="text-3xl font-black text-slate-900">Welcome back, {resumeData.name}!</h2>
                   <p className="text-slate-500 font-medium">Here's what's happening in your student profile today.</p>
                </div>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-brand-${i*100+400}`}></div>)}
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">+12</div>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                   <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   </div>
                   <h3 className="text-slate-900 font-black text-lg">Academic Status</h3>
                   <p className="text-slate-500 text-sm mt-1">GPA: <span className="text-brand-600 font-bold">{resumeData.education[0].gpa}</span> (Distinction)</p>
                </div>
                
                <div 
                  onClick={() => setView('resume')}
                  className="bg-brand-600 p-6 rounded-3xl shadow-lg shadow-brand-100 text-white cursor-pointer hover:scale-[1.02] transition-transform"
                >
                   <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                   </div>
                   <h3 className="font-black text-lg">Resume Ready</h3>
                   <p className="text-brand-100 text-sm mt-1">1 Project recently added. Update now for placements.</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                   <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                   </div>
                   <h3 className="text-slate-900 font-black text-lg">Upcoming Events</h3>
                   <p className="text-slate-500 text-sm mt-1">Campus Placement Drive starts in 14 days.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-200">
                   <h3 className="text-slate-900 font-black text-xl mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-brand-500 rounded-full"></span>
                      Skill Matrix
                   </h3>
                   <div className="space-y-4">
                      {resumeData.skills.languages.map(skill => (
                        <div key={skill} className="space-y-1">
                           <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                              <span>{skill}</span>
                              <span className="text-brand-600">Advanced</span>
                           </div>
                           <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-brand-500 h-full w-[85%] rounded-full"></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200">
                   <h3 className="text-slate-900 font-black text-xl mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-slate-800 rounded-full"></span>
                      Recent Activity
                   </h3>
                   <div className="space-y-6">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-800">New Project Added</p>
                            <p className="text-xs text-slate-500">Home Automation (Senior Project)</p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-800">Profile Updated</p>
                            <p className="text-xs text-slate-500">New email: prabutmalaiiecw@gmail.com</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        ) : view === 'resume' ? (
          <div className="print:shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResumeTemplate data={resumeData} />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto h-[800px] flex flex-col animate-in fade-in duration-300">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Resume Source Data (JSON)</label>
            <textarea
              className="flex-1 w-full p-6 font-mono text-xs bg-white border border-slate-200 rounded-2xl shadow-inner focus:ring-2 focus:ring-brand-500 outline-none resize-none transition-all"
              value={JSON.stringify(resumeData, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setResumeData(parsed);
                } catch (err) {
                  // silent fail for partial edits
                }
              }}
            />
            <div className="bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-full mt-3 self-start font-bold uppercase tracking-widest">Live Sync Enabled</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
