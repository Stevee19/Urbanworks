import { useState, useEffect } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import { projectsApi, contentApi } from '../../lib/api';
import { FolderOpen, FileText, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [projectCount, setProjectCount] = useState(0);
  const [contentCount, setContentCount] = useState(0);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      projectsApi.getAll(),
      contentApi.getAll(),
    ])
      .then(([projects, content]) => {
        setProjectCount(projects.length);
        setContentCount(content.length);
        setRecentProjects(projects.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Projects', value: projectCount, icon: FolderOpen, color: 'bg-blue-500' },
    { label: 'Content Items', value: contentCount, icon: FileText, color: 'bg-green-500' },
    { label: 'Sections Active', value: new Set(recentProjects.map(p => p.category)).size, icon: TrendingUp, color: 'bg-accent' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader />
      <div className="p-8 text-xs">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
              <span className="text-3xl font-bold text-primary">{stat.value}</span>
              <p className="text-sm text-gray mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-primary mb-4">Recent Projects</h2>
          {recentProjects.length === 0 ? (
            <p className="text-gray text-sm">No projects yet. Add your first project from the Projects section.</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <span className="font-medium text-primary">{project.title}</span>
                    <span className="text-sm text-gray ml-3">{project.category}</span>
                  </div>
                  <span className="text-xs text-gray">{project.location || 'N/A'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
