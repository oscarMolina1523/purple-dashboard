
import React from 'react';
import { Task } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { useApp } from '@/context/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface KanbanBoardProps {
  projectId?: string;
}

export const KanbanBoard = ({ projectId }: KanbanBoardProps) => {
  const { tasks, updateTaskStatus } = useApp();
  const isMobile = useIsMobile();
  
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

  // For mobile/tablet view, use a tabbed interface
  if (isMobile) {
    return (
      <Tabs defaultValue="todo" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="todo">Por hacer ({todoTasks.length})</TabsTrigger>
          <TabsTrigger value="in-progress">En progreso ({inProgressTasks.length})</TabsTrigger>
          <TabsTrigger value="review">Revisión ({reviewTasks.length})</TabsTrigger>
          <TabsTrigger value="done">Completado ({doneTasks.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="todo">
          <KanbanColumn 
            title="Por hacer" 
            count={todoTasks.length} 
            status="todo" 
            tasks={todoTasks} 
            onDrop={handleTaskDrop}
            color="status-todo"
          />
        </TabsContent>
        <TabsContent value="in-progress">
          <KanbanColumn 
            title="En progreso" 
            count={inProgressTasks.length} 
            status="in-progress" 
            tasks={inProgressTasks} 
            onDrop={handleTaskDrop}
            color="status-in-progress"
          />
        </TabsContent>
        <TabsContent value="review">
          <KanbanColumn 
            title="Revisión" 
            count={reviewTasks.length} 
            status="review" 
            tasks={reviewTasks} 
            onDrop={handleTaskDrop}
            color="status-review"
          />
        </TabsContent>
        <TabsContent value="done">
          <KanbanColumn 
            title="Completado" 
            count={doneTasks.length} 
            status="done" 
            tasks={doneTasks} 
            onDrop={handleTaskDrop}
            color="status-done"
          />
        </TabsContent>
      </Tabs>
    );
  }

  // For desktop view, use a grid layout
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
