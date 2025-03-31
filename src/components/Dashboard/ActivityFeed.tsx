
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Task, User } from '@/types';
import { getUserById } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ActivityFeedProps {
  tasks: Task[];
  className?: string;
}

type Activity = {
  id: string;
  user: User;
  task: Task;
  action: string;
  timestamp: string;
};

export const ActivityFeed = ({ tasks, className }: ActivityFeedProps) => {
  // Generate mock activities based on tasks
  const generateActivities = (): Activity[] => {
    const activities: Activity[] = [];
    
    tasks.forEach(task => {
      if (task.assignedTo.length > 0) {
        const user = getUserById(task.assignedTo[0]) as User;
        
        const activityTypes = [
          {
            id: `${task.id}-created`,
            action: 'creó la tarea',
            timestamp: task.createdAt
          }
        ];
        
        if (task.status === 'in-progress') {
          activityTypes.push({
            id: `${task.id}-progress`,
            action: 'comenzó a trabajar en',
            timestamp: new Date(new Date(task.createdAt).getTime() + 3600000).toISOString()
          });
        }
        
        if (task.status === 'review') {
          activityTypes.push({
            id: `${task.id}-review`,
            action: 'envió a revisión',
            timestamp: new Date(new Date(task.createdAt).getTime() + 86400000).toISOString()
          });
        }
        
        if (task.status === 'done') {
          activityTypes.push({
            id: `${task.id}-done`,
            action: 'completó',
            timestamp: new Date(new Date(task.createdAt).getTime() + 172800000).toISOString()
          });
        }
        
        activityTypes.forEach(activity => {
          activities.push({
            id: activity.id,
            user,
            task,
            action: activity.action,
            timestamp: activity.timestamp
          });
        });
      }
    });
    
    // Sort activities by timestamp (most recent first)
    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 5); // Only show the 5 most recent activities
  };
  
  const activities = generateActivities();

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
      
      {activities.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">
          No hay actividad reciente
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{' '}
                  <span className="text-muted-foreground">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.task.title}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { 
                    addSuffix: true,
                    locale: es
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
