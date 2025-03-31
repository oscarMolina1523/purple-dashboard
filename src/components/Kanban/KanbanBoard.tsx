
import React from 'react';
import { Task } from '@/types';
import { KanbanColumn } from './KanbanColumn';
import { useApp } from '@/context/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
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
      <div className="flex flex-col h-full">
        <Tabs defaultValue="todo" className="w-full flex flex-col h-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="todo" className="text-xs py-1">Por hacer <span className="ml-1 text-xs">({todoTasks.length})</span></TabsTrigger>
            <TabsTrigger value="in-progress" className="text-xs py-1">En progreso <span className="ml-1 text-xs">({inProgressTasks.length})</span></TabsTrigger>
            <TabsTrigger value="review" className="text-xs py-1">Revisión <span className="ml-1 text-xs">({reviewTasks.length})</span></TabsTrigger>
            <TabsTrigger value="done" className="text-xs py-1">Completado <span className="ml-1 text-xs">({doneTasks.length})</span></TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-hidden">
            <TabsContent value="todo" className="h-full mt-0">
              <KanbanColumn 
                title="Por hacer" 
                count={todoTasks.length} 
                status="todo" 
                tasks={todoTasks} 
                onDrop={handleTaskDrop}
                color="status-todo"
              />
            </TabsContent>
            <TabsContent value="in-progress" className="h-full mt-0">
              <KanbanColumn 
                title="En progreso" 
                count={inProgressTasks.length} 
                status="in-progress" 
                tasks={inProgressTasks} 
                onDrop={handleTaskDrop}
                color="status-in-progress"
              />
            </TabsContent>
            <TabsContent value="review" className="h-full mt-0">
              <KanbanColumn 
                title="Revisión" 
                count={reviewTasks.length} 
                status="review" 
                tasks={reviewTasks} 
                onDrop={handleTaskDrop}
                color="status-review"
              />
            </TabsContent>
            <TabsContent value="done" className="h-full mt-0">
              <KanbanColumn 
                title="Completado" 
                count={doneTasks.length} 
                status="done" 
                tasks={doneTasks} 
                onDrop={handleTaskDrop}
                color="status-done"
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    );
  }

  // For desktop view, use a grid layout with scroll
  return (
    <div className="h-full overflow-hidden">
      <ScrollArea className="h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-1 min-h-[calc(100vh-12rem)]">
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
      </ScrollArea>
    </div>
  );
};

export default KanbanBoard;
