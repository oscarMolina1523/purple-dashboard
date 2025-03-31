
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-border bg-background">
      <div className="flex items-center gap-2 w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Buscar..." 
            className="pl-10 bg-secondary text-foreground"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">3</span>
        </Button>
        
        <Button className="bg-primary hover:bg-primary/90">Crear Tarea</Button>
      </div>
    </header>
  );
};

export default Header;
