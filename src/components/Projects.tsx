import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Projects = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation();
  const projects = [
    {
      title: 'Parkview Heights',
      category: 'Residential Development',
      location: 'Philippines',
      image: '/images/IMG1.jpg',
    },
    {
      title: 'Unioil Billboard',
      category: 'Commercial Structure',
      location: 'Min. Avenue',
      image: '/images/IMG2.jpg',
    },
    {
      title: 'Cabuyao Project',
      category: 'Commercial Development',
      location: 'Laguna',
      image: '/images/IMG3.jpg',
    },
    {
      title: 'Soldiers Hills',
      category: 'Residential Complex',
      location: 'Muntinlupa City',
      image: '/images/IMG4.png',
    },
    {
      title: 'Ponte Vista',
      category: 'Residential Development',
      location: 'Batangas',
      image: '/images/IMG1.jpg',
    },
    {
      title: '3D Architectural Design',
      category: 'Design Services',
      image: '/images/IMG2.jpg',
    },
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div ref={sectionRef} className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title">Projects Gallery</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-500 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-4 sm:p-5">
                <h4 className="text-base sm:text-lg font-bold text-primary mb-1">
                  {project.title}
                </h4>
                <p className="text-xs sm:text-sm text-accent font-medium">
                  {project.category}
                </p>
                {project.location && (
                  <span className="flex items-center gap-1 text-xs text-gray mt-2">
                    <MapPin size={12} className="text-gray" />
                    {project.location}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8 sm:mt-12">
          <Link to="/projects" className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
