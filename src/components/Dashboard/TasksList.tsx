
import React from 'react';
import { Task, User } from '@/types';
import { getUserById } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Check, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useApp } from '@/context/AppContext';

interface TasksListProps {
  title: string;
  tasks: Task[];
  icon?: React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

const statusColors = {
  'todo': 'bg-status-todo',
  'in-progress': 'bg-status-in-progress',
  'review': 'bg-status-review',
  'done': 'bg-status-done',
};

const priorityLabels = {
  'low': 'Baja',
  'medium': 'Media',
  'high': 'Alta',
};

const priorityColors = {
  'low': 'bg-priority-low',
  'medium': 'bg-priority-medium',
  'high': 'bg-priority-high',
};

export const TasksList = ({ title, tasks, icon, emptyMessage = "No hay tareas", className }: TasksListProps) => {
  const { updateTaskStatus } = useApp();

  const renderAssignees = (assignedIds: string[]) => {
    if (assignedIds.length === 0) return null;
    
    // Show only the first 3 assignees
    const visibleAssignees = assignedIds.slice(0, 3);
    const remainingCount = assignedIds.length - visibleAssignees.length;
    
    return (
      <div className="flex -space-x-2">
        {visibleAssignees.map((userId) => {
          const user = getUserById(userId) as User;
          return (
            <Avatar key={userId} className="h-6 w-6 border-2 border-white">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          );
        })}
        {remainingCount > 0 && (
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-muted-foreground text-xs border-2 border-white">
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d MMM", { locale: es });
  };

  const handleToggleComplete = (task: Task) => {
    const newStatus = task.status === 'done' ? 'todo' : 'done';
    updateTaskStatus(task.id, newStatus);
  };

  return (
    <div className={cn("dashboard-section", className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <h2 className="text-lg font-semibold">{title}</h2>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
            {tasks.length}
          </span>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="flex items-start gap-3">
                <button 
                  onClick={() => handleToggleComplete(task)}
                  className={cn(
                    "flex-shrink-0 h-5 w-5 rounded-full border border-input flex items-center justify-center",
                    task.status === 'done' && "bg-primary border-primary"
                  )}
                >
                  {task.status === 'done' && <Check className="h-3 w-3 text-primary-foreground" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={cn(
                      "font-medium truncate",
                      task.status === 'done' && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                      statusColors[task.status],
                      "text-white"
                    )}>
                      {task.status === 'todo' && 'Por hacer'}
                      {task.status === 'in-progress' && 'En progreso'}
                      {task.status === 'review' && 'Revisión'}
                      {task.status === 'done' && 'Completado'}
                    </span>
                    
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                      priorityColors[task.priority],
                      "text-white"
                    )}>
                      {priorityLabels[task.priority]}
                    </span>
                    
                    <span className="inline-flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatDueDate(task.dueDate)}
                    </span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  {renderAssignees(task.assignedTo)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksList;
