
export type Status = 'todo' | 'in-progress' | 'review' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  assignedTo: string[];
  projectId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamMembers: string[];
  tasks: Task[];
  createdAt: string;
  color: string;
}

export interface Team {
  id: string;
  name: string;
  members: User[];
}
