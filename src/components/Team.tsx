import { User, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Team = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: founderRef, isVisible: founderVisible } = useScrollAnimation();
  const teamDepartments = [
    { role: 'Architecture', members: 'Licensed Architects' },
    { role: 'Engineering', members: 'Civil, Structural, Electrical & Mechanical Engineers' },
    { role: 'Technical', members: 'Master Plumber, Project Manager, Estimator' },
    { role: 'Construction', members: 'Skilled Construction Workers & Technicians' },
  ];

  return (
    <section id="team" className="py-12 sm:py-16 md:py-20 bg-white">
      <div ref={sectionRef} className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-subtitle">Our People</span>
          <h2 className="section-title">Team Urbanworks</h2>
        </div>

        {/* Founder */}
        <div ref={founderRef} className={`max-w-3xl mx-auto mb-8 sm:mb-12 transition-all duration-700 delay-200 ${founderVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8 bg-gray-50 rounded-xl">
            {/* Founder Image Placeholder */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
              <User size={32} strokeWidth={1.5} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-light" />
            </div>

            {/* Founder Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">
                Mr. Earonjohn Paulo Gonzales
              </h3>
              <p className="text-xs sm:text-sm text-accent font-semibold uppercase tracking-widest mb-2 sm:mb-3">
                Founder & CEO
              </p>
              <p className="text-sm sm:text-base text-gray leading-relaxed">
                Leading Urbanworks Construction with a commitment to excellence
                and innovation in the construction industry since 2019.
              </p>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {teamDepartments.map((dept, index) => (
            <div
              key={dept.role}
              className={`p-4 sm:p-6 bg-gray-50 rounded-lg text-center transition-all duration-500 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              <h4 className="text-sm sm:text-base font-bold text-primary mb-1 sm:mb-2">
                {dept.role}
              </h4>
              <p className="text-xs sm:text-sm text-gray">{dept.members}</p>
            </div>
          ))}
        </div>

        {/* PCAB Badge */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-br from-primary to-primary-light rounded-xl text-white transition-all duration-700 delay-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <img src="/images/PCAB 1.jpg" alt="PCAB Logo" className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full object-cover border-2 border-accent/30" />
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-base sm:text-lg font-bold">PCAB Licensed</span>
            <span className="text-xs sm:text-sm text-gray-light">License No. 56616, Category D</span>
          </div>
          <a
            href="https://pcab.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-accent px-3 sm:px-4 py-2 bg-accent/10 rounded-md hover:bg-accent/20 transition-colors duration-200"
          >
            Verify
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Team;
