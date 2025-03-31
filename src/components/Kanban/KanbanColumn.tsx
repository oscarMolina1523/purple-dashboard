
import React, { useState } from 'react';
import { Status, Task, Priority } from '@/types';
import { KanbanTask } from './KanbanTask';
import { cn } from '@/lib/utils';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface KanbanColumnProps {
  title: string;
  count: number;
  status: Status;
  tasks: Task[];
  onDrop: (taskId: string, status: Status) => void;
  color: string;
}

export const KanbanColumn = ({ title, count, status, tasks, onDrop, color }: KanbanColumnProps) => {
  const { currentProject, addTask } = useApp();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  
  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onDrop(taskId, status);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim() || !currentProject) return;
    
    const today = new Date();
    // Set due date to 7 days from now
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 7);
    
    addTask({
      title: newTaskTitle,
      description: newTaskDescription,
      status: status,
      priority: priority,
      dueDate: dueDate.toISOString(),
      assignedTo: [],
      projectId: currentProject.id,
    });
    
    // Reset form
    setNewTaskTitle('');
    setNewTaskDescription('');
    setPriority('medium');
    setIsAddingTask(false);
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
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 bg-secondary/50 p-3 rounded-lg overflow-hidden flex flex-col min-h-[calc(60vh-4rem)]">
        {isAddingTask && (
          <div className="bg-white p-3 rounded-lg shadow mb-3 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Nueva tarea</h4>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setIsAddingTask(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <Input
                placeholder="Título de la tarea"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full"
              />
              <Textarea
                placeholder="Descripción"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="w-full"
                rows={2}
              />
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Prioridad
                </label>
                <Select
                  value={priority}
                  onValueChange={(value: Priority) => setPriority(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddTask}>Guardar</Button>
              </div>
            </div>
          </div>
        )}
        
        <ScrollArea className="h-full pr-2">
          <div className="space-y-3 pr-1">
            {tasks.length === 0 && !isAddingTask ? (
              <div className="h-full flex items-center justify-center min-h-[10rem]">
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default KanbanColumn;
