import React from 'react';
import { Project } from '../../types/Project';
import { Users, User, Award } from 'lucide-react';

interface TeamMembersPanelProps {
  projects: Project[];
}

interface TeamMemberStats {
  name: string;
  projectCount: number;
  activeProjects: number;
  completedProjects: number;
  technologies: string[];
}

export const TeamMembersPanel: React.FC<TeamMembersPanelProps> = ({ projects }) => {
  const getTeamStats = (): TeamMemberStats[] => {
    const memberMap = new Map<string, TeamMemberStats>();

    projects.forEach(project => {
      project.team.forEach(member => {
        if (!memberMap.has(member)) {
          memberMap.set(member, {
            name: member,
            projectCount: 0,
            activeProjects: 0,
            completedProjects: 0,
            technologies: []
          });
        }

        const stats = memberMap.get(member)!;
        stats.projectCount++;
        
        if (project.status === 'in-progress') {
          stats.activeProjects++;
        } else if (project.status === 'completed') {
          stats.completedProjects++;
        }

        // Adicionar tecnologias únicas
        project.technologies.forEach(tech => {
          if (!stats.technologies.includes(tech)) {
            stats.technologies.push(tech);
          }
        });
      });
    });

    return Array.from(memberMap.values()).sort((a, b) => b.projectCount - a.projectCount);
  };

  const teamStats = getTeamStats();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500'
    ];
    
    const index = name.length % colors.length;
    return colors[index];
  };

  if (teamStats.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Membros da Equipe</h2>
          <Users className="w-5 h-5 text-gray-400" />
        </div>
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhum membro cadastrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Membros da Equipe</h2>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{teamStats.length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {teamStats.slice(0, 6).map((member, index) => (
          <div key={member.name} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full ${getAvatarColor(member.name)} flex items-center justify-center text-white font-medium text-sm`}>
                {getInitials(member.name)}
              </div>
              {index < 3 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Award className="w-2.5 h-2.5 text-yellow-800" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                <span className="text-xs text-gray-500">{member.projectCount} projeto{member.projectCount !== 1 ? 's' : ''}</span>
              </div>
              
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">{member.activeProjects} ativo{member.activeProjects !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">{member.completedProjects} concluído{member.completedProjects !== 1 ? 's' : ''}</span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {member.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                  {member.technologies.length > 3 && (
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{member.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {teamStats.length > 6 && (
          <div className="text-center pt-2">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todos os {teamStats.length} membros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};