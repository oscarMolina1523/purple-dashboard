
import React from 'react';
import { Task } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { useApp } from '@/context/AppContext';

interface KanbanBoardProps {
  projectId?: string;
}

export const KanbanBoard = ({ projectId }: KanbanBoardProps) => {
  const { tasks, updateTaskStatus } = useApp();
  
  // Filter tasks by project if projectId is provided
  const filteredTasks = projectId
    ? tasks.filter(task => task.projectId === projectId)
    : tasks;
  
  // Group tasks by status
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const reviewTasks = filteredTasks.filter(task => task.status === 'review');
  const doneTasks = filteredTasks.filter(task => task.status === 'done');
  
  const handleTaskDrop = (taskId: string, newStatus: Task['status']) => {
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
      <KanbanColumn 
        title="Por hacer" 
        count={todoTasks.length} 
        status="todo" 
        tasks={todoTasks} 
        onDrop={handleTaskDrop}
        color="status-todo"
      />
      
      <KanbanColumn 
        title="En progreso" 
        count={inProgressTasks.length} 
        status="in-progress" 
        tasks={inProgressTasks} 
        onDrop={handleTaskDrop}
        color="status-in-progress"
      />
      
      <KanbanColumn 
        title="Revisión" 
        count={reviewTasks.length} 
        status="review" 
        tasks={reviewTasks} 
        onDrop={handleTaskDrop}
        color="status-review"
      />
      
      <KanbanColumn 
        title="Completado" 
        count={doneTasks.length} 
        status="done" 
        tasks={doneTasks} 
        onDrop={handleTaskDrop}
        color="status-done"
      />
    </div>
  );
};

export default KanbanBoard;
