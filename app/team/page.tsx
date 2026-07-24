import Link from "next/link";

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Rishi Raj Prasad",
      role: "Lead Developer",
      image: "https://ui-avatars.com/api/?name=Rishi+Raj+Prasad&background=0D8ABC&color=fff&size=256", 
      linkedin: "#",
      email: "mailto:rishi@example.com"
    },
    {
      id: 2,
      name: "Team Member 2",
      role: "Design & Media Coordinator",
      image: "https://ui-avatars.com/api/?name=Team+Member+2&background=10B981&color=fff&size=256",
      linkedin: "#",
      email: "mailto:member2@example.com"
    },
    {
      id: 3,
      name: "Team Member 3",
      role: "AI/ML Engineer",
      image: "https://ui-avatars.com/api/?name=Team+Member+3&background=F59E0B&color=fff&size=256",
      linkedin: "#",
      email: "mailto:member3@example.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Meet The Team</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            The passionate minds working behind the scenes to build technology for a greener and cleaner tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="h-64 overflow-hidden relative bg-gray-200">
                {/* Image Placeholder */}
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm font-semibold text-green-600 mb-4">{member.role}</p>
                <div className="flex justify-center gap-4">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href={member.email} className="text-gray-400 hover:text-red-500 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}