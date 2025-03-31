
import React from 'react';
import { useApp } from '@/context/AppContext';
import KanbanBoard from '@/components/Kanban/KanbanBoard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const KanbanPage = () => {
  const { projects, currentProject, setCurrentProject } = useApp();
  
  const handleProjectChange = (projectId: string) => {
    if (projectId === 'all') {
      setCurrentProject(null);
    } else {
      const selectedProject = projects.find(p => p.id === projectId) || null;
      setCurrentProject(selectedProject);
    }
  };
  
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Tablero Kanban</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Organiza y visualiza el progreso de tus tareas
          </p>
        </div>
        
        <div className="w-full md:w-64">
          <Select
            value={currentProject?.id || "all"}
            onValueChange={handleProjectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar proyecto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los proyectos</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <KanbanBoard 
          projectId={currentProject?.id} 
        />
      </div>
    </div>
  );
};

export default KanbanPage;
