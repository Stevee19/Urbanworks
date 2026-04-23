import bcrypt from 'bcryptjs';
import db from './db';
import { config } from './config';

console.log('Seeding database...');

// Create default admin user
const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(config.adminEmail);
if (!existingUser) {
  const hashedPassword = bcrypt.hashSync(config.adminPassword, 10);
  db.prepare('INSERT INTO users (email, password_hash, role, display_name, phone, address) VALUES (?, ?, ?, ?, ?, ?)').run(
    config.adminEmail,
    hashedPassword,
    'admin',
    'Admin User',
    '+63 912 345 6789',
    '2823 Amaia Skies North Tower, Brgy. Highway Hills, Mandaluyong City, Philippines'
  );
  console.log('✓ Admin user created');
} else {
  console.log('⊘ Admin user already exists');
}

// Ensure admin profile has default values
db.prepare(`
  UPDATE users SET
    display_name = COALESCE(display_name, 'Admin User'),
    phone = COALESCE(phone, '+63 912 345 6789'),
    address = COALESCE(address, '2823 Amaia Skies North Tower, Brgy. Highway Hills, Mandaluyong City, Philippines')
  WHERE email = ?
`).run(config.adminEmail);

// Seed projects
const projects = [
  { title: 'Parkview Heights', category: 'Residential Development', location: 'Philippines', description: 'Modern residential condominium with premium amenities', is_featured: 1, display_order: 1 },
  { title: 'Unioil Billboard', category: 'Commercial Structure', location: 'Min. Avenue', description: 'Commercial signage structure design and construction', is_featured: 0, display_order: 2 },
  { title: 'Cabuyao Project', category: 'Commercial Development', location: 'Laguna', description: 'Mixed-use commercial development in Laguna', is_featured: 0, display_order: 3 },
  { title: 'Soldiers Hills', category: 'Residential Complex', location: 'Muntinlupa City', description: 'Residential housing development with modern design', is_featured: 0, display_order: 4 },
  { title: 'Ponte Vista', category: 'Residential Development', location: 'Batangas', description: 'Bridge-view residential community', is_featured: 0, display_order: 5 },
  { title: '3D Architectural Design', category: 'Design Services', location: null, description: 'Professional 3D rendering and architectural visualization', is_featured: 0, display_order: 6 },
];

const projectStmt = db.prepare(`
  INSERT OR IGNORE INTO projects (title, category, location, description, is_featured, display_order)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const insertProjects = db.transaction((projectsList: typeof projects) => {
  for (const p of projectsList) {
    projectStmt.run(p.title, p.category, p.location, p.description, p.is_featured, p.display_order);
  }
});

const existingProjects = db.prepare('SELECT COUNT(*) as count FROM projects').get() as any;
if (existingProjects.count === 0) {
  insertProjects(projects);
  console.log('✓ Projects seeded');
} else {
  console.log('⊘ Projects already exist');
}

// Seed site content
const siteContent = [
  // Hero section
  { section: 'hero', key: 'subtitle', value: 'Engineers | Builders' },
  { section: 'hero', key: 'title_line_1', value: 'Urbanworks' },
  { section: 'hero', key: 'title_line_2', value: 'Construction' },
  { section: 'hero', key: 'title_line_3', value: '& Development' },
  { section: 'hero', key: 'description', value: 'Architectural And Engineering Services' },
  { section: 'hero', key: 'cta_primary', value: 'Get a Quote' },
  { section: 'hero', key: 'cta_secondary', value: 'View Our Projects' },
  { section: 'hero', key: 'bg_image', value: '/images/bg1.png' },

  // About section
  { section: 'about', key: 'subtitle', value: 'About Us' },
  { section: 'about', key: 'title', value: 'Building Dreams Since 2019' },
  { section: 'about', key: 'established_year', value: '2019' },
  { section: 'about', key: 'founder', value: 'Mr. Earonjohn Paulo Gonzales' },
  { section: 'about', key: 'description_1', value: 'Urbanworks Construction & Development was established in 2019 by Mr. Earonjohn Paulo Gonzales with a vision to deliver exceptional construction services that exceed client expectations.' },
  { section: 'about', key: 'description_2', value: 'We are a PCAB Licensed construction company (License No. 56616, Category D) committed to delivering high-quality residential, commercial, and infrastructure projects across the Philippines.' },
  { section: 'about', key: 'stats_1_number', value: '5+' },
  { section: 'about', key: 'stats_1_label', value: 'Years of Excellence' },
  { section: 'about', key: 'stats_2_number', value: '50+' },
  { section: 'about', key: 'stats_2_label', value: 'Projects Completed' },
  { section: 'about', key: 'stats_3_number', value: '100%' },
  { section: 'about', key: 'stats_3_label', value: 'Client Satisfaction' },
  { section: 'about', key: 'image', value: '/images/IMG4.png' },

  // Vision & Mission
  { section: 'vision_mission', key: 'subtitle', value: 'Our Direction' },
  { section: 'vision_mission', key: 'vision_title', value: 'Our Vision' },
  { section: 'vision_mission', key: 'vision_text', value: 'To be the leading construction company in the Philippines, known for quality, innovation, and excellence in every project we undertake.' },
  { section: 'vision_mission', key: 'mission_title', value: 'Our Mission' },
  { section: 'vision_mission', key: 'mission_text', value: 'To deliver world-class construction services with integrity, safety, and sustainability, exceeding client expectations on every project.' },

  // Values
  { section: 'values', key: 'subtitle', value: 'What Drives Us' },
  { section: 'values', key: 'title', value: 'Core Values' },
  { section: 'values', key: 'values', value: JSON.stringify([
    { title: 'Integrity', description: 'We uphold honesty and transparency in every aspect of our work.' },
    { title: 'Quality', description: 'We deliver the highest standards of construction excellence.' },
    { title: 'Safety', description: 'We prioritize the safety of our team and communities.' },
    { title: 'Innovation', description: 'We embrace modern techniques and technologies.' },
  ]) },

  // Services (stored as JSON array)
  { section: 'services', key: 'subtitle', value: 'What We Offer' },
  { section: 'services', key: 'title', value: 'Our Services' },
  { section: 'services', key: 'services', value: JSON.stringify([
    { title: 'Residential Construction', description: 'Custom home building and residential development projects tailored to your lifestyle.', icon: 'Home' },
    { title: 'Commercial Construction', description: 'Office buildings, retail spaces, and commercial facilities built for business success.', icon: 'Building' },
    { title: 'Interior Works & Fit-outs', description: 'Professional interior design and fit-out services for modern spaces.', icon: 'Paintbrush' },
    { title: 'Repair & Renovation', description: 'Expert repair and renovation services to revitalize your existing structures.', icon: 'Wrench' },
    { title: 'Building Permit Processing', description: 'Complete assistance with building permits and regulatory compliance.', icon: 'FileText' },
    { title: '3D Design & Blueprint Plans', description: 'Professional architectural design and detailed blueprint planning services.', icon: 'Box' },
  ]) },

  // Team
  { section: 'team', key: 'subtitle', value: 'Our People' },
  { section: 'team', key: 'title', value: 'Team Urbanworks' },
  { section: 'team', key: 'founder_name', value: 'Mr. Earonjohn Paulo Gonzales' },
  { section: 'team', key: 'founder_role', value: 'Founder & CEO' },
  { section: 'team', key: 'founder_description', value: 'Leading Urbanworks Construction with a commitment to excellence and innovation in the construction industry since 2019.' },
  { section: 'team', key: 'departments', value: JSON.stringify([
    { role: 'Architecture', members: 'Licensed Architects' },
    { role: 'Engineering', members: 'Civil, Structural, Electrical & Mechanical Engineers' },
    { role: 'Technical', members: 'Master Plumber, Project Manager, Estimator' },
    { role: 'Construction', members: 'Skilled Construction Workers & Technicians' },
  ]) },
  { section: 'team', key: 'pcab_license', value: '56616' },
  { section: 'team', key: 'pcab_category', value: 'D' },

  // Contact
  { section: 'contact', key: 'subtitle', value: 'Get In Touch' },
  { section: 'contact', key: 'title', value: 'Contact Us' },
  { section: 'contact', key: 'email', value: 'urban.worksservice@gmail.com' },
  { section: 'contact', key: 'phone', value: '+63 912 345 6789' },
  { section: 'contact', key: 'address', value: '2823 Amaia Skies North Tower, Brgy. Highway Hills, Mandaluyong City, Philippines' },
  { section: 'contact', key: 'cta_title', value: 'Ready to Build Your Dream?' },
  { section: 'contact', key: 'cta_text', value: "Let's discuss your project. Our team is ready to help you bring your vision to life with quality and excellence." },
  { section: 'contact', key: 'cta_button', value: 'Start Your Project' },
];

const contentStmt = db.prepare(`
  INSERT OR IGNORE INTO site_content (section, key, value)
  VALUES (?, ?, ?)
`);

const insertContent = db.transaction((items: typeof siteContent) => {
  for (const item of items) {
    contentStmt.run(item.section, item.key, item.value);
  }
});

const existingContent = db.prepare('SELECT COUNT(*) as count FROM site_content').get() as any;
if (existingContent.count === 0) {
  insertContent(siteContent);
  console.log('✓ Site content seeded');
} else {
  console.log('⊘ Site content already exists');
}

console.log('Database seeding complete!');
process.exit(0);
