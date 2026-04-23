import { Eye, Target } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const VisionMission = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  return (
    <section id="vision-mission" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div ref={sectionRef} className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-subtitle">Our Direction</span>
          <h2 className="section-title">Vision & Mission</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Vision Card */}
          <div className={`bg-white p-6 sm:p-8 rounded-xl shadow-sm border-l-4 border-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-500 delay-200 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-50 rounded-lg mb-4 sm:mb-6">
              <Eye className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-accent" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Our Vision</h3>
            <p className="text-sm sm:text-base text-gray leading-relaxed">
              To be the builder of choice for value-minded clients and
              high-performing employees.
            </p>
          </div>

          {/* Mission Card */}
          <div className={`bg-white p-6 sm:p-8 rounded-xl shadow-sm border-l-4 border-accent hover:-translate-y-1 hover:shadow-lg transition-all duration-500 delay-400 ${sectionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gray-50 rounded-lg mb-4 sm:mb-6">
              <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-accent" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Our Mission</h3>
            <p className="text-sm sm:text-base text-gray leading-relaxed">
              To perform for our customers the highest level of quality
              construction services at fair and market-competitive prices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
