
import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import KanbanBoard from '@/components/Kanban/KanbanBoard';
import TasksList from '@/components/Dashboard/TasksList';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserById } from '@/data/mockData';
import { User, Task } from '@/types';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, tasks } = useApp();
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-muted-foreground">Proyecto no encontrado</p>
      </div>
    );
  }
  
  // Filter tasks related to this project
  const projectTasks = tasks.filter(task => task.projectId === project.id);
  
  // Get tasks by status
  const todoTasks = projectTasks.filter(task => task.status === 'todo');
  const inProgressTasks = projectTasks.filter(task => task.status === 'in-progress');
  const reviewTasks = projectTasks.filter(task => task.status === 'review');
  const completedTasks = projectTasks.filter(task => task.status === 'done');
  
  // Calculate progress
  const progress = projectTasks.length > 0
    ? Math.round((completedTasks.length / projectTasks.length) * 100)
    : 0;
  
  // Get team members
  const teamMembers = project.teamMembers
    .map(id => getUserById(id))
    .filter((user): user is User => user !== undefined);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        
        <Button className="bg-primary hover:bg-primary/90">Nueva Tarea</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="dashboard-section">
          <h2 className="text-lg font-semibold mb-4">Progreso</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Completado</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <span className="text-2xl font-bold">{projectTasks.length}</span>
                <p className="text-sm text-muted-foreground">Tareas Totales</p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <span className="text-2xl font-bold">{completedTasks.length}</span>
                <p className="text-sm text-muted-foreground">Completadas</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-section">
          <h2 className="text-lg font-semibold mb-4">Estado</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-status-todo/20 flex items-center justify-center text-status-todo">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Por hacer</p>
                <p className="text-xl font-bold">{todoTasks.length}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-status-in-progress/20 flex items-center justify-center text-status-in-progress">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En progreso</p>
                <p className="text-xl font-bold">{inProgressTasks.length}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-status-review/20 flex items-center justify-center text-status-review">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revisión</p>
                <p className="text-xl font-bold">{reviewTasks.length}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-status-done/20 flex items-center justify-center text-status-done">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completado</p>
                <p className="text-xl font-bold">{completedTasks.length}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-section">
          <h2 className="text-lg font-semibold mb-4">Equipo</h2>
          {teamMembers.length === 0 ? (
            <p className="text-center text-muted-foreground">No hay miembros asignados</p>
          ) : (
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="kanban" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="kanban">Tablero Kanban</TabsTrigger>
          <TabsTrigger value="tasks">Lista de Tareas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="kanban" className="mt-0">
          <KanbanBoard projectId={project.id} />
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0 space-y-6">
          <TasksList 
            title="Tareas por hacer" 
            tasks={todoTasks}
            icon={<Clock size={18} />}
            emptyMessage="No hay tareas por hacer"
          />
          
          <TasksList 
            title="Tareas en progreso" 
            tasks={inProgressTasks}
            icon={<Clock size={18} />}
            emptyMessage="No hay tareas en progreso"
          />
          
          <TasksList 
            title="Tareas en revisión" 
            tasks={reviewTasks}
            icon={<Calendar size={18} />}
            emptyMessage="No hay tareas en revisión"
          />
          
          <TasksList 
            title="Tareas completadas" 
            tasks={completedTasks.slice(0, 5)}
            icon={<CheckCircle size={18} />}
            emptyMessage="No hay tareas completadas"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPage;
