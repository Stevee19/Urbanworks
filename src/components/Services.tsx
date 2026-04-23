import { Home, Building, Paintbrush, Wrench, FileText, Box } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Services = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const services = [
    {
      title: 'Residential Construction',
      description:
        'Custom home building and residential development projects tailored to your lifestyle.',
      icon: <Home size={32} />,
    },
    {
      title: 'Commercial Construction',
      description:
        'Office buildings, retail spaces, and commercial facilities built for business success.',
      icon: <Building size={32} />,
    },
    {
      title: 'Interior Works & Fit-outs',
      description: 'Professional interior design and fit-out services for modern spaces.',
      icon: <Paintbrush size={32} />,
    },
    {
      title: 'Repair & Renovation',
      description:
        'Expert repair and renovation services to revitalize your existing structures.',
      icon: <Wrench size={32} />,
    },
    {
      title: 'Building Permit Processing',
      description: 'Complete assistance with building permits and regulatory compliance.',
      icon: <FileText size={32} />,
    },
    {
      title: '3D Design & Blueprint Plans',
      description: 'Professional architectural design and detailed blueprint planning services.',
      icon: <Box size={32} />,
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
      <div ref={sectionRef} className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-subtitle">What We Offer</span>
          <h2 className="section-title">Our Services</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`p-6 sm:p-8 bg-white border border-gray-100 rounded-xl hover:border-accent hover:-translate-y-1 hover:shadow-md transition-all duration-500 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-accent/10 rounded-lg mb-4 sm:mb-6">
                <span className="text-accent">{service.icon}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
