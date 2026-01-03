
import React from 'react';
import { ResumeData } from '../types';

interface ResumeTemplateProps {
  data: ResumeData;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <div className="bg-[#fcfcf9] shadow-2xl w-full max-w-4xl mx-auto overflow-hidden resume-font text-[13px] leading-relaxed border border-slate-200 min-h-[1050px] transition-all flex flex-col md:flex-row print:shadow-none print:border-none print:bg-white">
      
      {/* Sidebar - Left Column */}
      <aside className="w-full md:w-[32%] bg-brand-900 text-white p-8 flex flex-col gap-8 print:bg-brand-900">
        {/* Contact Info */}
        <section>
          <h2 className="text-brand-300 font-bold uppercase tracking-widest text-[14px] mb-4 border-b border-brand-700 pb-1">Contact</h2>
          <div className="space-y-3 text-brand-50">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-tighter text-brand-400">Phone</span>
              <span className="font-medium">{data.contact.phone}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-tighter text-brand-400">Email</span>
              <span className="font-medium break-all">{data.contact.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-tighter text-brand-400">LinkedIn</span>
              <a href={`https://${data.contact.linkedin}`} className="font-medium hover:text-brand-300 transition-colors underline decoration-brand-600 underline-offset-4">{data.contact.linkedin}</a>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-tighter text-brand-400">Portfolio</span>
              <a href={`https://${data.contact.portfolio}`} className="font-medium hover:text-brand-300 transition-colors underline decoration-brand-600 underline-offset-4 break-all">{data.contact.portfolio}</a>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-brand-300 font-bold uppercase tracking-widest text-[14px] mb-4 border-b border-brand-700 pb-1">Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-4 last:mb-0">
              <div className="font-bold text-brand-100 mb-0.5 leading-tight">{edu.school}</div>
              <div className="text-brand-400 text-[11px] uppercase font-bold tracking-wider mb-1">{edu.date}</div>
              <div className="italic text-brand-200 text-[12px]">{edu.degree}</div>
              {edu.gpa && <div className="text-brand-300 text-[12px] font-bold">GPA: {edu.gpa}</div>}
              {edu.details && <p className="mt-1 text-brand-400 text-[11px] leading-snug">{edu.details}</p>}
            </div>
          ))}
        </section>

        {/* Skills - Categorized */}
        <section>
          <h2 className="text-brand-300 font-bold uppercase tracking-widest text-[14px] mb-4 border-b border-brand-700 pb-1">Expertise</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-brand-400 text-[10px] uppercase font-bold tracking-widest mb-2">Programming</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.languages.map((s, i) => (
                  <span key={i} className="bg-brand-800 text-brand-100 px-2 py-0.5 rounded text-[11px] font-medium border border-brand-700">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-brand-400 text-[10px] uppercase font-bold tracking-widest mb-2">Tools & Apps</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.applications.map((s, i) => (
                  <span key={i} className="bg-brand-800 text-brand-100 px-2 py-0.5 rounded text-[11px] font-medium border border-brand-700">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-brand-400 text-[10px] uppercase font-bold tracking-widest mb-2">Other</h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.other.map((s, i) => (
                  <span key={i} className="bg-brand-800 text-brand-100 px-2 py-0.5 rounded text-[11px] font-medium border border-brand-700">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </aside>

      {/* Main Content - Right Column */}
      <main className="flex-1 p-10 bg-gradient-to-br from-[#fdfdfb] to-[#f4f7f9] relative">
        {/* Aesthetic Corner Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full opacity-50 -z-0"></div>

        {/* Header Name */}
        <div className="mb-10 relative z-10">
          <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-none mb-2">
            {data.name.split('. ').map((part, i, arr) => (
              <span key={i} className={i === arr.length - 1 ? "text-brand-600" : ""}>
                {part}{i < arr.length - 1 ? ". " : ""}
              </span>
            ))}
          </h1>
          <div className="flex items-center gap-3">
            <span className="h-1 w-12 bg-brand-500"></span>
            <span className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[12px]">Computer Engineering Professional</span>
          </div>
        </div>

        {/* Experience Section */}
        <section className="mb-10 relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[18px] font-black uppercase tracking-widest text-slate-800">Professional Experience</h2>
            <div className="flex-1 h-px bg-slate-300/50"></div>
          </div>
          {data.experience.map((exp, idx) => (
            <div key={idx} className="mb-8 last:mb-0 relative pl-6 border-l-2 border-brand-100">
              {/* Dot for timeline */}
              <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-[#fdfdfb] bg-brand-500 shadow-sm"></div>
              
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-[16px] font-bold text-slate-900">{exp.role}</h3>
                <span className="text-brand-700 font-bold text-[12px] bg-brand-100/50 px-2 py-0.5 rounded border border-brand-200">{exp.date}</span>
              </div>
              <div className="text-slate-600 font-bold italic mb-3 flex items-center gap-2">
                <span>{exp.company}</span>
                <span className="text-slate-300">•</span>
                <span>{exp.location}</span>
              </div>
              <ul className="space-y-2 text-slate-700 marker:text-brand-400 list-disc ml-4">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-justify leading-relaxed">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Technical Projects Section */}
        <section className="mb-10 relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[18px] font-black uppercase tracking-widest text-slate-800">Strategic Projects</h2>
            <div className="flex-1 h-px bg-slate-300/50"></div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-sm p-5 rounded-xl border border-white shadow-sm hover:shadow-md hover:bg-white/80 transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-6 bg-brand-500 rounded-full"></div>
                  <span className="font-black text-slate-900 text-[14px] group-hover:text-brand-800">{proj.title}</span>
                </div>
                <p className="text-slate-600 text-[13px] leading-snug pl-3.5 border-l border-slate-200 ml-0.5">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Section */}
        <section className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[18px] font-black uppercase tracking-widest text-slate-800">Leadership & Impact</h2>
            <div className="flex-1 h-px bg-slate-300/50"></div>
          </div>
          <div className="space-y-6">
            {data.leadership.map((lead, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-[#fdfdfb] bg-slate-300 shadow-sm"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{lead.company}</h3>
                  <span className="text-slate-500 font-bold text-[11px]">{lead.date}</span>
                </div>
                <div className="text-brand-700 font-bold text-[12px] mb-2">{lead.role}</div>
                <ul className="space-y-1 text-slate-700 marker:text-slate-300 list-disc ml-4">
                  {lead.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResumeTemplate;
