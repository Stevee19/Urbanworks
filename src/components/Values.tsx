import { ShieldCheck, BookOpen, Users } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Values = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const values = [
    {
      title: 'Integrity',
      description:
        'We conduct business with honesty and transparency, building trust with every project.',
      icon: <ShieldCheck size={40} />,
    },
    {
      title: 'Expertise',
      description:
        'Our team brings specialized knowledge and skills to deliver exceptional results.',
      icon: <BookOpen size={40} />,
    },
    {
      title: 'Leadership',
      description:
        'We lead by example, setting industry standards in quality and professionalism.',
      icon: <Users size={40} />,
    },
  ];

  return (
    <section className="relative py-20 bg-[url('/images/bg4.png')] bg-cover bg-center text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/70"></div>

      <div ref={sectionRef} className="relative z-10 max-w-container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-subtitle">What Drives Us</span>
          <h2 className="section-title text-white">
            Integrity. Expertise. Leadership.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`text-center p-8 bg-primary-light rounded-xl hover:-translate-y-1 transition-all duration-500 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-accent/10 rounded-full">
                <span className="text-accent">{value.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-base text-gray-light leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
