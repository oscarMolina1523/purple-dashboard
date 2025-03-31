
import React, { useState, useEffect } from 'react';
import { Bell, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage 
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Priority, Status, Task } from '@/types';
import { useForm } from 'react-hook-form';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type FormData = {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
};

export const Header = () => {
  const { addTask, currentProject, projects, tasks } = useApp();
  const [open, setOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Filter tasks based on search query
  const filteredTasks = searchQuery 
    ? tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const form = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
      status: 'todo',
    },
  });
  
  const onSubmit = (data: FormData) => {
    // If no project is selected, use the first project
    const projectId = currentProject?.id || projects[0]?.id;
    
    if (!projectId) return;
    
    const today = new Date();
    // Set due date to 7 days from now
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 7);
    
    addTask({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: dueDate.toISOString(),
      assignedTo: [],
      projectId: projectId,
    });
    
    form.reset();
    setOpen(false);
    toast.success("Tarea creada correctamente");
  };

  // Handle keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Navigate to project when task is selected
  const handleSelectTask = (task: Task) => {
    const project = projects.find(p => p.id === task.projectId);
    if (project) {
      navigate(`/project/${project.id}`);
      toast.info(`Navegando a: ${project.name}`);
      setCommandOpen(false);
    }
  };

  // Handle search input change
  const handleSearchClick = () => {
    setCommandOpen(true);
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-border bg-background">
      <div className="flex items-center gap-2 w-full max-w-md">
        <div className="relative w-full cursor-pointer" onClick={handleSearchClick}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Buscar..." 
            className="pl-10 bg-secondary text-foreground"
            readOnly
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
            ⌘K
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">3</span>
        </Button>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">Crear Tarea</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear nueva tarea</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Título de la tarea" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descripción de la tarea" 
                          rows={3} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prioridad</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar prioridad" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Baja</SelectItem>
                            <SelectItem value="medium">Media</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="todo">Por hacer</SelectItem>
                            <SelectItem value="in-progress">En progreso</SelectItem>
                            <SelectItem value="review">Revisión</SelectItem>
                            <SelectItem value="done">Completado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end gap-4 pt-2">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">Guardar</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Command Dialog for Search */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput 
          placeholder="Buscar tareas..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          {filteredTasks.length > 0 && (
            <CommandGroup heading="Tareas">
              {filteredTasks.map((task) => {
                const project = projects.find(p => p.id === task.projectId);
                return (
                  <CommandItem 
                    key={task.id} 
                    onSelect={() => handleSelectTask(task)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span>{task.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {project?.name || "Proyecto no encontrado"}
                      </span>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : task.priority === 'medium' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;
