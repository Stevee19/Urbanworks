import { useState } from 'react';
import { MapPin } from 'lucide-react';

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const projects = [
    {
      title: 'Parkview Heights',
      category: 'Residential',
      location: 'Philippines',
      image: '/images/IMG1.jpg',
    },
    {
      title: 'Unioil Billboard',
      category: 'Commercial',
      location: 'Min. Avenue',
      image: '/images/IMG2.jpg',
    },
    {
      title: 'Cabuyao Project',
      category: 'Commercial',
      location: 'Laguna',
      image: '/images/IMG3.jpg',
    },
    {
      title: 'Soldiers Hills',
      category: 'Residential',
      location: 'Muntinlupa City',
      image: '/images/IMG4.png',
    },
    {
      title: 'Ponte Vista',
      category: 'Residential',
      location: 'Batangas',
      image: '/images/IMG1.jpg',
    },
    {
      title: '3D Architectural Design',
      category: 'Design',
      image: '/images/IMG2.jpg',
    },
  ];

  const categories = ['All', 'Residential', 'Commercial', 'Design', 'Billboard'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="pt-28 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">Projects Gallery</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 xs:px-4 xs:py-2 text-xs xs:text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white text-primary hover:bg-accent/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
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
              <div className="p-4">
                <h4 className="text-lg font-bold text-primary mb-1">
                  {project.title}
                </h4>
                <p className="text-sm text-accent font-medium">
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

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray py-12">No projects found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
