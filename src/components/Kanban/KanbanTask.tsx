
import React from 'react';
import { Task, User } from '@/types';
import { getUserById } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock } from 'lucide-react';

interface KanbanTaskProps {
  task: Task;
}

const priorityColors = {
  'low': 'bg-priority-low',
  'medium': 'bg-priority-medium',
  'high': 'bg-priority-high',
};

const priorityLabels = {
  'low': 'Baja',
  'medium': 'Media',
  'high': 'Alta',
};

export const KanbanTask = ({ task }: KanbanTaskProps) => {
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

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

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return today > dueDate && task.status !== 'done';
  };

  return (
    <div 
      className="task-card cursor-grab hover:shadow-md"
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
    >
      <div className="mb-2">
        <h3 className="font-medium">{task.title}</h3>
        <p className="text-sm text-muted-foreground truncate mt-1">
          {task.description}
        </p>
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <span className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
            priorityColors[task.priority],
            "text-white"
          )}>
            {priorityLabels[task.priority]}
          </span>
          
          <span className={cn(
            "inline-flex items-center text-xs gap-1",
            isOverdue() ? "text-red-500" : "text-muted-foreground"
          )}>
            <Clock className="h-3 w-3" />
            {formatDueDate(task.dueDate)}
          </span>
        </div>
        
        <div>
          {renderAssignees(task.assignedTo)}
        </div>
      </div>
    </div>
  );
};

export default KanbanTask;
