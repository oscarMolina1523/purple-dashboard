import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Calendar, Columns3, LayoutDashboard, Menu, Settings, Users, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projects } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const mainLinks = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Tablero Kanban', path: '/kanban', icon: <Columns3 size={20} /> },
    { name: 'Equipo', path: '/team', icon: <Users size={20} /> },
    { name: 'Calendario', path: '/calendar', icon: <Calendar size={20} /> },
    { name: 'Configuración', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Botón de menú hamburguesa en dispositivos móviles */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-sidebar p-4 z-50 flex justify-start">
        <button 
          className="text-white p-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:relative flex flex-col h-screen bg-sidebar w-64 p-4 text-sidebar-foreground transition-transform md:translate-x-0", 
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
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
                    onClick={() => {
                      navigate(link.path);
                      setIsOpen(false);
                    }}
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
                    onClick={() => {
                      navigate(`/project/${project.id}`);
                      setIsOpen(false);
                    }}
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
    </>
  );
};

export default Sidebar;
