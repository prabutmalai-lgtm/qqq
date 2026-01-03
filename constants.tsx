
import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  name: "Er. S. PRABAKARAN",
  contact: {
    phone: "(805) 291-4444",
    email: "prabutmalaiiecw@gmail.com",
    linkedin: "linkedin.com/in/mas9gonz",
    portfolio: "portfolium.com/mas9gonz"
  },
  education: [
    {
      school: "California Polytechnic State University, San Luis Obispo",
      location: "San Luis Obispo, CA",
      degree: "Bachelor of Science in Computer Engineering",
      date: "December 20xx",
      gpa: "3.3"
    },
    {
      school: "Cuesta College – San Luis Obispo",
      location: "San Luis Obispo, CA",
      degree: "Associate of Science in Math and Science",
      date: "May 20xx",
      gpa: "3.4",
      details: "Financing 100% of college expenses – work 15 to 20 hours per week during college"
    }
  ],
  skills: {
    languages: ["C", "HTML", "CSS", "Java", "VHDL", "Assembly"],
    hardware: ["Function Generator", "Digital and Analog Multimeters", "Oscilloscope", "DC Power Supply", "Op Amp Circuit Board"],
    applications: ["Eclipse", "Xilinx", "ModelSim", "PSpice", "Minitab", "Microsoft Word/Excel/PowerPoint"],
    other: ["Fluent in Spanish"]
  },
  experience: [
    {
      company: "Experts Exchange",
      location: "San Luis Obispo, CA",
      role: "Quality Assurance Intern",
      date: "June 20xx – Sept. 20xx",
      bullets: [
        "Developed and executed structured test plans for the company’s continuous software releases in AWS",
        "Designed and implemented automated test scripts to perform black and white box testing in AWS test environment",
        "Reviewed old regression tests and restructured them for greater efficiency",
        "Participated in software release processes as member of the release team and developed training materials for software release processes for other interns",
        "Coordinated issue resolutions among the development, marketing, and creative teams"
      ]
    }
  ],
  projects: [
    {
      title: "Home Automation (Senior Project)",
      description: "Designed and implemented home automation for Cal Poly’s Solar Decathlon design competition using a network of 7 microcontrollers and 15 sensors. Collaborated with 70 students leading to enhanced teamwork, communication, and project management skills."
    },
    {
      title: "VCB1",
      description: "Used assembly language to program a basic computer unit onto a programmable logic device complete with data path components and a control unit"
    },
    {
      title: "Software Development",
      description: "Programmed an average of two software programs per week in various programming languages"
    },
    {
      title: "Hardware",
      description: "Designed and constructed an array of electrical circuit systems facilitated by using numerous hardware testing devices"
    }
  ],
  leadership: [
    {
      company: "Multicultural Engineering Program (MEP) – Cal Poly and Cuesta College",
      location: "",
      role: "Tutor (15 to 20 hours per week)",
      date: "August 20xx – Present",
      bullets: [
        "Enhanced leadership, communication, and interpersonal skills through tutoring peers in computer programming, physics, and calculus."
      ]
    },
    {
      company: "Society of Hispanic Professional Engineers – Cal Poly",
      location: "",
      role: "Volunteer",
      date: "Monthly",
      bullets: [
        "Volunteer monthly by tutoring local junior high school children in math and science"
      ]
    }
  ]
};

export const SYSTEM_INSTRUCTION = `
You are an expert technical resume writer and career coach. 
You will be provided with a resume for Er. S. PRABAKARAN.
Your goal is to help the user optimize this resume for specific job descriptions or improve its overall impact.

When asked to "Improve" or "Tailor":
1. Use strong action verbs (e.g., 'Spearheaded', 'Optimized', 'Engineered').
2. Quantify achievements where possible.
3. Suggest skills that might be missing for specific roles.
4. Ensure the tone is professional and concise.

Format your output in a clear way that identifies specific sections to update.
`;
