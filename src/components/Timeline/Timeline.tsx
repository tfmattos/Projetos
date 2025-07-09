import React, { useState } from 'react';
import { Project } from '../../types/Project';
import { Calendar, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { ProjectDetailsModal } from './ProjectDetailsModal';

interface TimelineProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ projects, onProjectClick }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getSortedProjects = () => {
    return [...projects].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-gray-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'testing':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      case 'on-hold':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'Planejamento';
      case 'in-progress':
        return 'Em Andamento';
      case 'testing':
        return 'Testando';
      case 'completed':
        return 'Concluído';
      case 'on-hold':
        return 'Pausado';
      default:
        return status;
    }
  };

  const getSoftwareTypeLabel = (type: Project['softwareType']) => {
    switch (type) {
      case 'web':
        return 'Web';
      case 'mobile':
        return 'Mobile';
      case 'desktop':
        return 'Desktop';
      case 'api':
        return 'API';
      case 'database':
        return 'BD';
      case 'devops':
        return 'DevOps';
      default:
        return type;
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return <Calendar className="w-4 h-4 text-white" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-white" />;
      case 'testing':
        return <AlertCircle className="w-4 h-4 text-white" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-white" />;
      case 'on-hold':
        return <AlertCircle className="w-4 h-4 text-white" />;
      default:
        return <Calendar className="w-4 h-4 text-white" />;
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    if (onProjectClick) {
      onProjectClick(project);
    }
  };

  const sortedProjects = getSortedProjects();

  if (sortedProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Nenhum projeto para exibir no cronograma</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="relative">
          {/* Linha do cronograma */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {sortedProjects.map((project, index) => (
            <div key={project.id} className="relative flex items-start space-x-6 pb-8">
              {/* Ponto do cronograma */}
              <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${getStatusColor(project.status)} shadow-lg`}>
                {getStatusIcon(project.status)}
              </div>
              
              {/* Card do projeto */}
              <div 
                className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer group"
                onClick={() => handleProjectClick(project)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                    <Eye className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm text-gray-500">{getSoftwareTypeLabel(project.softwareType)}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-4">
                    <span>Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                    <span>Fim: {new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'on-hold' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusLabel(project.status)}
                    </span>
                    <span className="text-gray-600">{project.progress}%</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        project.status === 'completed' ? 'bg-green-500' :
                        project.status === 'in-progress' ? 'bg-blue-500' :
                        project.status === 'on-hold' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Informações adicionais */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{project.team.length} membro{project.team.length !== 1 ? 's' : ''}</span>
                    <span>{project.epics?.length || 0} épico{(project.epics?.length || 0) !== 1 ? 's' : ''}</span>
                    {project.hasCostBenefit && project.costBenefit && (
                      <span className="text-green-600 font-medium">
                        ROI: R$ {project.costBenefit.estimatedReturn.toLocaleString('pt-BR')}
                      </span>
                    )}
                  </div>
                  <span className="text-blue-600 font-medium">Clique para detalhes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalhes do projeto */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};