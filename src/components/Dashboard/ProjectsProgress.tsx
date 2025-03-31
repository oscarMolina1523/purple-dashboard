
import React from 'react';
import { Project } from '@/types';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProjectsProgressProps {
  projects: Project[];
  className?: string;
}

export const ProjectsProgress = ({ projects, className }: ProjectsProgressProps) => {
  // Calculate project progress based on completed tasks
  const calculateProgress = (project: Project) => {
    if (project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(task => task.status === 'done');
    return Math.round((completedTasks.length / project.tasks.length) * 100);
  };

  return (
    <div className={cn("dashboard-section", className)}>
      <h2 className="text-lg font-semibold mb-4">Progreso de Proyectos</h2>
      
      <div className="space-y-4">
        {projects.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No hay proyectos para mostrar
          </div>
        ) : (
          projects.map((project) => {
            const progress = calculateProgress(project);
            
            return (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    ></span>
                    <span className="font-medium">{project.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                
                <Progress value={progress} className="h-2" />
                
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>{project.tasks.filter(t => t.status === 'done').length} completadas</span>
                  <span>{project.tasks.length} tareas totales</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProjectsProgress;
