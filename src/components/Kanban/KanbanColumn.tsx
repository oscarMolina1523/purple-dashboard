
import React from 'react';
import { Status, Task } from '@/types';
import { KanbanTask } from './KanbanTask';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KanbanColumnProps {
  title: string;
  count: number;
  status: Status;
  tasks: Task[];
  onDrop: (taskId: string, status: Status) => void;
  color: string;
}

export const KanbanColumn = ({ title, count, status, tasks, onDrop, color }: KanbanColumnProps) => {
  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onDrop(taskId, status);
  };

  return (
    <div 
      className="flex flex-col h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("h-3 w-3 rounded-full bg-" + color)}></div>
          <h3 className="font-medium">{title}</h3>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
            {count}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 bg-secondary/50 p-3 rounded-lg overflow-hidden flex flex-col min-h-[50vh]">
        <div className="space-y-3 flex-1 overflow-y-auto pr-1">
          {tasks.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No hay tareas
              </p>
            </div>
          ) : (
            tasks.map(task => (
              <KanbanTask key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
