
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona tus preferencias y configuración de la cuenta
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tu información personal y datos de contacto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" defaultValue="Ana Rodríguez" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ana@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" defaultValue="+34 600000001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Cargo</Label>
                  <Input id="position" defaultValue="Diseñadora UI/UX" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <textarea
                  id="bio"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Diseñadora de interfaces de usuario con experiencia en diseño web y aplicaciones móviles."
                />
              </div>
              
              <div className="flex justify-end">
                <Button>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>
                Actualiza tu foto de perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-full overflow-hidden border border-border">
                  <img src="https://i.pravatar.cc/150?img=1" alt="Perfil" className="h-full w-full object-cover" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline">Cambiar Foto</Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, GIF o PNG. Máximo 1MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>
                Actualiza tu contraseña de acceso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="flex justify-end">
                <Button>Actualizar Contraseña</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sesiones Activas</CardTitle>
              <CardDescription>
                Gestiona los dispositivos donde has iniciado sesión
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <p className="font-medium">Chrome - Windows</p>
                    <p className="text-sm text-muted-foreground">Madrid, España - Activo ahora</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Actual</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <p className="font-medium">Safari - iPhone</p>
                    <p className="text-sm text-muted-foreground">Madrid, España - Hace 2 horas</p>
                  </div>
                  <Button variant="outline" size="sm">Cerrar</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Firefox - MacOS</p>
                    <p className="text-sm text-muted-foreground">Barcelona, España - Hace 2 días</p>
                  </div>
                  <Button variant="outline" size="sm">Cerrar</Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" className="text-destructive">Cerrar Todas las Sesiones</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo y cuándo quieres recibir notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notificaciones por Email</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>Nuevas asignaciones de tareas</p>
                    <p className="text-sm text-muted-foreground">Recibe un email cuando se te asigne una nueva tarea</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>Comentarios en tareas</p>
                    <p className="text-sm text-muted-foreground">Recibe un email cuando alguien comente en tus tareas</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>Cambios de estado</p>
                    <p className="text-sm text-muted-foreground">Recibe un email cuando cambien el estado de tus tareas</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Notificaciones del Sistema</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>Notificaciones en el navegador</p>
                    <p className="text-sm text-muted-foreground">Recibe notificaciones en el navegador en tiempo real</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>Sonidos de notificación</p>
                    <p className="text-sm text-muted-foreground">Reproducir sonidos cuando recibas notificaciones</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>Resumen semanal</p>
                    <p className="text-sm text-muted-foreground">Recibe un resumen semanal de tu actividad</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Guardar Preferencias</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
