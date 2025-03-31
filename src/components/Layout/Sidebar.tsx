
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Columns3, Users, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects } = useApp();

  const isActive = (path: string) => location.pathname === path;

  const mainLinks = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Tablero Kanban', path: '/kanban', icon: <Columns3 size={20} /> },
    { name: 'Equipo', path: '/team', icon: <Users size={20} /> },
    { name: 'Calendario', path: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Configuración', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-sidebar w-64 p-4 text-sidebar-foreground">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center">
          <span className="text-sidebar font-bold text-lg">PM</span>
        </div>
        <h1 className="text-xl font-bold">Project Hub</h1>
      </div>

      <nav className="flex-1">
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2 text-sidebar-foreground/70 px-3">PRINCIPAL</h2>
          <ul className="space-y-1">
            {mainLinks.map((link) => (
              <li key={link.path}>
                <button
                  onClick={() => navigate(link.path)}
                  className={cn(
                    "sidebar-link w-full text-left",
                    isActive(link.path) && "active"
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold mb-2 text-sidebar-foreground/70 px-3">PROYECTOS</h2>
          <ul className="space-y-1">
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  onClick={() => navigate(`/project/${project.id}`)}
                  className={cn(
                    "sidebar-link w-full text-left",
                    isActive(`/project/${project.id}`) && "active"
                  )}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></span>
                  <span className="truncate">{project.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-sidebar-border pt-4 mt-auto">
        <div className="flex items-center gap-3 p-2">
          <div className="h-9 w-9 rounded-full bg-sidebar-accent overflow-hidden">
            <img src="https://i.pravatar.cc/150?img=1" alt="User" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium">Ana Rodríguez</h3>
            <p className="text-xs text-sidebar-foreground/70">ana@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
