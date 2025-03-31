
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Task } from '@/types';
import { tasks } from '@/data/mockData';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Group tasks by date for calendar display
  const tasksByDate = tasks.reduce((acc, task) => {
    const dateKey = format(new Date(task.dueDate), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {} as Record<string, Task[]>);
  
  // Tasks for the selected date
  const selectedDateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const selectedDateTasks = tasksByDate[selectedDateStr] || [];
  
  // Custom day content renderer
  const renderDay = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayTasks = tasksByDate[dateStr] || [];
    
    // Determine priority color (use highest priority if multiple tasks)
    let priorityColor = '';
    if (dayTasks.some(task => task.priority === 'high')) {
      priorityColor = 'bg-priority-high';
    } else if (dayTasks.some(task => task.priority === 'medium')) {
      priorityColor = 'bg-priority-medium';
    } else if (dayTasks.some(task => task.priority === 'low')) {
      priorityColor = 'bg-priority-low';
    }
    
    return (
      <div className="relative h-full w-full p-2">
        <div className="text-center">
          {format(day, 'd')}
          {dayTasks.length > 0 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
              <div className={cn(
                "h-1.5 w-1.5 rounded-full",
                priorityColor
              )}></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const priorityColors = {
    'low': 'border-l-priority-low',
    'medium': 'border-l-priority-medium',
    'high': 'border-l-priority-high',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Calendario</h1>
        <p className="text-muted-foreground">
          Visualiza y organiza tus tareas en el calendario
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={es}
                className="rounded-md border pointer-events-auto"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {date ? format(date, "EEEE, d 'de' MMMM", { locale: es }) : 'Sin fecha seleccionada'}
                </h2>
                <Badge variant="outline" className="bg-primary/10">
                  {selectedDateTasks.length} tareas
                </Badge>
              </div>
              
              {selectedDateTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No hay tareas para esta fecha
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={cn(
                        "p-4 border-l-4 rounded-md bg-secondary/50",
                        priorityColors[task.priority]
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <Badge variant="outline">
                          {task.status === 'todo' && 'Por hacer'}
                          {task.status === 'in-progress' && 'En progreso'}
                          {task.status === 'review' && 'Revisión'}
                          {task.status === 'done' && 'Completado'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
