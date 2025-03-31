
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Task, User } from '../types';
import { projects as initialProjects, tasks as initialTasks, users as initialUsers } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

type AppContextType = {
  projects: Project[];
  tasks: Task[];
  users: User[];
  currentProject: Project | null;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  deleteTask: (taskId: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [users] = useState<User[]>(initialUsers);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set the first project as the current project when the component mounts
    if (projects.length > 0 && !currentProject) {
      setCurrentProject(projects[0]);
    }
  }, [projects, currentProject]);

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProjects([...projects, newProject]);
    toast({
      title: 'Proyecto creado',
      description: `'${newProject.name}' ha sido creado con éxito`,
    });
  };

  const updateProject = (project: Project) => {
    setProjects(projects.map(p => p.id === project.id ? project : p));
    
    // Update the current project if it's the one being updated
    if (currentProject && currentProject.id === project.id) {
      setCurrentProject(project);
    }
    
    toast({
      title: 'Proyecto actualizado',
      description: `'${project.name}' ha sido actualizado`,
    });
  };

  const deleteProject = (projectId: string) => {
    const projectToDelete = projects.find(p => p.id === projectId);
    
    setProjects(projects.filter(p => p.id !== projectId));
    setTasks(tasks.filter(t => t.projectId !== projectId));
    
    // If the current project is being deleted, set the first remaining project as current
    if (currentProject && currentProject.id === projectId) {
      const remainingProjects = projects.filter(p => p.id !== projectId);
      setCurrentProject(remainingProjects.length > 0 ? remainingProjects[0] : null);
    }
    
    if (projectToDelete) {
      toast({
        title: 'Proyecto eliminado',
        description: `'${projectToDelete.name}' ha sido eliminado`,
      });
    }
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    
    // Update the tasks array in the corresponding project
    const updatedProjects = projects.map(project => {
      if (project.id === task.projectId) {
        return {
          ...project,
          tasks: [...project.tasks, newTask],
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    
    // Update the current project if it's the one being modified
    if (currentProject && currentProject.id === task.projectId) {
      const updatedProject = updatedProjects.find(p => p.id === task.projectId);
      if (updatedProject) {
        setCurrentProject(updatedProject);
      }
    }
    
    toast({
      title: 'Tarea creada',
      description: `'${newTask.title}' ha sido creada`,
    });
  };

  const updateTask = (task: Task) => {
    setTasks(tasks.map(t => t.id === task.id ? task : t));
    
    // Update the task in the corresponding project
    const updatedProjects = projects.map(project => {
      if (project.id === task.projectId) {
        return {
          ...project,
          tasks: project.tasks.map(t => t.id === task.id ? task : t),
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    
    // Update the current project if it's the one being modified
    if (currentProject && currentProject.id === task.projectId) {
      const updatedProject = updatedProjects.find(p => p.id === task.projectId);
      if (updatedProject) {
        setCurrentProject(updatedProject);
      }
    }
    
    toast({
      title: 'Tarea actualizada',
      description: `'${task.title}' ha sido actualizada`,
    });
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    
    if (taskToUpdate) {
      const updatedTask: Task = {
        ...taskToUpdate,
        status,
      };
      
      updateTask(updatedTask);
    }
  };

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    
    if (taskToDelete) {
      setTasks(tasks.filter(t => t.id !== taskId));
      
      // Remove the task from the corresponding project
      const updatedProjects = projects.map(project => {
        if (project.id === taskToDelete.projectId) {
          return {
            ...project,
            tasks: project.tasks.filter(t => t.id !== taskId),
          };
        }
        return project;
      });
      
      setProjects(updatedProjects);
      
      // Update the current project if it's the one being modified
      if (currentProject && currentProject.id === taskToDelete.projectId) {
        const updatedProject = updatedProjects.find(p => p.id === taskToDelete.projectId);
        if (updatedProject) {
          setCurrentProject(updatedProject);
        }
      }
      
      toast({
        title: 'Tarea eliminada',
        description: `'${taskToDelete.title}' ha sido eliminada`,
      });
    }
  };

  return (
    <AppContext.Provider value={{
      projects,
      tasks,
      users,
      currentProject,
      setCurrentProject,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      updateTaskStatus,
      deleteTask,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
