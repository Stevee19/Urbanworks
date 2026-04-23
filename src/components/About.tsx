import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const stats = [
    { number: '5+', label: 'Years of Excellence' },
    { number: '50+', label: 'Projects Completed' },
    { number: '100%', label: 'Client Satisfaction' },
  ];

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white">
      <div ref={sectionRef} className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-subtitle">About Us</span>
          <h2 className="section-title">Building Dreams Since 2019</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div ref={textRef} className={`transition-all duration-700 delay-200 ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <p className="text-base sm:text-lg text-gray mb-3 sm:mb-4">
              Urbanworks Construction & Development was established in{' '}
              <strong className="text-primary font-semibold">2019</strong> by{' '}
              <strong className="text-primary font-semibold">
                Mr. Earonjohn Paulo Gonzales
              </strong>{' '}
              with a vision to deliver exceptional construction services that
              exceed client expectations.
            </p>
            <p className="text-base sm:text-lg text-gray mb-3 sm:mb-4">
              We are a{' '}
              <strong className="text-primary font-semibold">PCAB Licensed</strong>{' '}
              construction company (License No. 56616, Category D) committed to
              delivering high-quality residential, commercial, and infrastructure
              projects across the Philippines.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-accent leading-none">
                    {stat.number}
                  </span>
                  <span className="text-xs sm:text-sm text-gray uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className={`rounded-xl overflow-hidden aspect-[4/3] transition-all duration-700 delay-300 ${imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <img
              src="/images/IMG4.png"
              alt="Urbanworks Construction Site"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
