
import React from 'react';
import { User } from '@/types';
import { users } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

const TeamPage = () => {
  // Add some mock data for team members
  const teamMembers: (User & { role: string, skills: string[], contact: { phone: string, github: string, linkedin: string } })[] = users.map((user, index) => ({
    ...user,
    role: [
      'Frontend Developer', 
      'Backend Developer', 
      'UI/UX Designer', 
      'Project Manager', 
      'Full Stack Developer'
    ][index % 5],
    skills: [
      ['React', 'TypeScript', 'Tailwind CSS'],
      ['Node.js', 'Express', 'MongoDB'],
      ['Figma', 'Adobe XD', 'UI Design'],
      ['Scrum', 'Jira', 'Team Leadership'],
      ['React', 'Node.js', 'SQL', 'AWS']
    ][index % 5],
    contact: {
      phone: `+34 ${600000000 + index}`,
      github: `github.com/${user.name.toLowerCase().replace(' ', '')}`,
      linkedin: `linkedin.com/in/${user.name.toLowerCase().replace(' ', '')}`
    }
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Equipo</h1>
        <p className="text-muted-foreground">
          Conoce a los miembros del equipo y sus roles
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5"></div>
            <CardContent className="pt-0 relative">
              <div className="flex justify-center -mt-12 mb-4">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
              
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-primary/5">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.contact.phone}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <span>{member.contact.github}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <span>{member.contact.linkedin}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
