
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from '@/components/Dashboard/StatsCard';
import TasksList from '@/components/Dashboard/TasksList';
import ProjectsProgress from '@/components/Dashboard/ProjectsProgress';
import ActivityFeed from '@/components/Dashboard/ActivityFeed';
import { getOverdueTasks, getUpcomingTasks } from '@/data/mockData';

const Dashboard = () => {
  const { tasks, projects } = useApp();
  
  // Get tasks by status
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'done');
  
  // Get upcoming and overdue tasks
  const upcomingTasks = getUpcomingTasks();
  const overdueTasks = getOverdueTasks();
  
  // Calculate stats
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks.length / totalTasks) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido a tu panel de gestión de proyectos
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Tareas Totales" 
          value={totalTasks} 
          icon={<Calendar size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatsCard 
          title="En Progreso" 
          value={inProgressTasks.length} 
          icon={<Clock size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        
        <StatsCard 
          title="Completadas" 
          value={completedTasks.length} 
          icon={<CheckCircle size={24} />}
          trend={{ value: 18, isPositive: true }}
        />
        
        <StatsCard 
          title="Tasa de Finalización" 
          value={`${completionRate}%`} 
          icon={<AlertCircle size={24} />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TasksList 
            title="Tareas Pendientes"
            tasks={todoTasks.slice(0, 5)}
            icon={<Clock size={18} />}
          />
          
          <TasksList 
            title="Próximas Fechas Límite"
            tasks={upcomingTasks}
            icon={<Calendar size={18} />}
            emptyMessage="No hay tareas con fechas próximas"
          />
          
          <TasksList 
            title="Tareas Atrasadas"
            tasks={overdueTasks}
            icon={<AlertCircle size={18} />}
            emptyMessage="¡No hay tareas atrasadas!"
          />
        </div>
        
        <div className="space-y-6">
          <ProjectsProgress projects={projects} />
          <ActivityFeed 
            tasks={tasks}
            className="dashboard-section"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
