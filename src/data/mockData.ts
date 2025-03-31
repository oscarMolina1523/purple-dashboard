
import { Project, Task, User, Team } from "../types";

export const users: User[] = [
  {
    id: "1",
    name: "Ana Rodríguez",
    email: "ana@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Carlos González",
    email: "carlos@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "María López",
    email: "maria@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Juan Martínez",
    email: "juan@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    name: "Luisa Pérez",
    email: "luisa@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
];

export const tasks: Task[] = [
  {
    id: "1",
    title: "Diseñar nueva página de inicio",
    description: "Crear un nuevo diseño para la página de inicio del sitio web.",
    status: "todo",
    priority: "high",
    dueDate: "2024-07-15T00:00:00Z",
    assignedTo: ["1"],
    projectId: "1",
    createdAt: "2024-06-25T10:30:00Z",
  },
  {
    id: "2",
    title: "Implementar autenticación de usuarios",
    description: "Agregar funcionalidad de inicio de sesión y registro.",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-07-10T00:00:00Z",
    assignedTo: ["2"],
    projectId: "1",
    createdAt: "2024-06-26T09:15:00Z",
  },
  {
    id: "3",
    title: "Optimizar rendimiento de carga",
    description: "Mejorar el tiempo de carga y la puntuación de PageSpeed.",
    status: "review",
    priority: "medium",
    dueDate: "2024-07-05T00:00:00Z",
    assignedTo: ["3"],
    projectId: "1",
    createdAt: "2024-06-27T14:45:00Z",
  },
  {
    id: "4",
    title: "Actualizar documentación API",
    description: "Documentar los nuevos endpoints y actualizaciones de la API.",
    status: "done",
    priority: "low",
    dueDate: "2024-06-30T00:00:00Z",
    assignedTo: ["4"],
    projectId: "1",
    createdAt: "2024-06-20T11:30:00Z",
  },
  {
    id: "5",
    title: "Revisar diseño móvil",
    description: "Comprobar la responsividad y mejorar la experiencia en dispositivos móviles.",
    status: "todo",
    priority: "medium",
    dueDate: "2024-07-20T00:00:00Z",
    assignedTo: ["5"],
    projectId: "1",
    createdAt: "2024-06-28T16:20:00Z",
  },
  {
    id: "6",
    title: "Crear página de productos",
    description: "Diseñar e implementar la nueva página de catálogo de productos.",
    status: "todo",
    priority: "medium",
    dueDate: "2024-07-25T00:00:00Z",
    assignedTo: ["1", "2"],
    projectId: "2",
    createdAt: "2024-06-29T09:10:00Z",
  },
  {
    id: "7",
    title: "Implementar carrito de compras",
    description: "Desarrollar la funcionalidad de carrito para la tienda online.",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-07-18T00:00:00Z",
    assignedTo: ["2", "4"],
    projectId: "2",
    createdAt: "2024-06-27T13:45:00Z",
  },
  {
    id: "8",
    title: "Integrar pasarela de pagos",
    description: "Conectar la plataforma con diferentes métodos de pago.",
    status: "todo",
    priority: "high",
    dueDate: "2024-07-30T00:00:00Z",
    assignedTo: ["3"],
    projectId: "2",
    createdAt: "2024-06-30T10:15:00Z",
  },
  {
    id: "9",
    title: "Desarrollar diseño logo corporativo",
    description: "Crear el nuevo logo siguiendo las directrices de marca.",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-07-07T00:00:00Z",
    assignedTo: ["5"],
    projectId: "3",
    createdAt: "2024-06-25T11:20:00Z",
  },
  {
    id: "10",
    title: "Diseñar tarjetas de visita",
    description: "Crear diseños para tarjetas de visita corporativas.",
    status: "review",
    priority: "low",
    dueDate: "2024-07-05T00:00:00Z",
    assignedTo: ["1"],
    projectId: "3",
    createdAt: "2024-06-26T14:30:00Z",
  },
  {
    id: "11",
    title: "Preparar presentación de marca",
    description: "Desarrollar una presentación para el nuevo lanzamiento de marca.",
    status: "todo",
    priority: "high",
    dueDate: "2024-07-12T00:00:00Z",
    assignedTo: ["5", "1"],
    projectId: "3",
    createdAt: "2024-06-28T09:45:00Z",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    name: "Rediseño Sitio Web",
    description: "Actualización completa del sitio web corporativo",
    teamMembers: ["1", "2", "3", "4", "5"],
    tasks: tasks.filter(task => task.projectId === "1"),
    createdAt: "2024-06-15T08:00:00Z",
    color: "#8B5CF6", // Purple
  },
  {
    id: "2",
    name: "Tienda Online",
    description: "Desarrollo de la plataforma de comercio electrónico",
    teamMembers: ["1", "2", "3", "4"],
    tasks: tasks.filter(task => task.projectId === "2"),
    createdAt: "2024-06-20T10:15:00Z",
    color: "#0EA5E9", // Blue
  },
  {
    id: "3",
    name: "Rebranding Corporativo",
    description: "Renovación de la identidad visual de la empresa",
    teamMembers: ["1", "5"],
    tasks: tasks.filter(task => task.projectId === "3"),
    createdAt: "2024-06-22T09:30:00Z",
    color: "#F97316", // Orange
  },
];

export const teams: Team[] = [
  {
    id: "1",
    name: "Equipo de Desarrollo",
    members: users.filter(user => ["2", "3", "4"].includes(user.id)),
  },
  {
    id: "2",
    name: "Equipo de Diseño",
    members: users.filter(user => ["1", "5"].includes(user.id)),
  },
];

// Utility function to get user by id
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.id === userId);
};

// Utility function to get tasks by status
export const getTasksByStatus = (status: string): Task[] => {
  return tasks.filter(task => task.status === status);
};

// Utility function to get tasks by project
export const getTasksByProject = (projectId: string): Task[] => {
  return tasks.filter(task => task.projectId === projectId);
};

// Utility function to get upcoming tasks (due in the next 7 days)
export const getUpcomingTasks = (): Task[] => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  return tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= nextWeek;
  });
};

// Utility function to get overdue tasks
export const getOverdueTasks = (): Task[] => {
  const today = new Date();
  
  return tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'done';
  });
};
