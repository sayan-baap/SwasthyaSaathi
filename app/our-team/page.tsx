"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, User } from "lucide-react";


type TeamMemberType = {
  name: string;
  role: string;
  bio: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
};

type TeamMemberProps = {
  member: TeamMemberType;
  index: number;
};


const teamMembers: TeamMemberType[] = [
  {
    name: "Sayan Ghosh",
    role: "UI/UX Designer",
    bio: "Sayan is a creative UI/UX designer passionate about crafting intuitive and engaging user experiences for AI-powered applications.",
    links: {
      github: "https://github.com/sayanghosh",
      linkedin: "https://www.linkedin.com/in/sayanTechX",
      email: "sayan@example.com",
    },
  },
  {
    name: "Prabuddha Narayan Datta",
    role: "Full Stack Developer",
    bio: "Prabuddha is a full stack developer with expertise in building scalable web applications, integrating AI solutions, and optimizing user experiences.",
    links: {
      github: "https://github.com/prabuddhaxdev",
      linkedin: "https://www.linkedin.com/in/prabuddhaxdev",
      email: "prabuddha@example.com",
    },
  },
];


const TeamMember = ({ member, index }: TeamMemberProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        <User className="w-24 h-24 sm:w-32 sm:h-32 text-blue-400" />
      </div>

      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
          {member.name}
        </h3>

        <p className="text-sm text-gray-400 mb-3">{member.role}</p>

        <p className="text-sm text-gray-300 mb-4 line-clamp-4">{member.bio}</p>

        <div className="flex gap-4">
          <a
            href={member.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href={member.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href={`mailto:${member.links.email}`}
            className="text-gray-400 hover:text-white transition"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};



export default function OurTeam() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Team
        </motion.h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} member={member} index={index} />
          ))}
        </section>
      </main>
    </div>
  );
}
