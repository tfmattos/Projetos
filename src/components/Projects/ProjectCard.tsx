import React from 'react';
import { Project } from '../../types/Project';
import { 
  Calendar, 
  Users, 
  Code, 
  MoreVertical,
  Edit3,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  viewMode?: 'grid' | 'list';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  viewMode = 'grid'
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'testing':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'on-hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'critical':
        return 'border-red-500';
      case 'high':
        return 'border-orange-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-green-500';
      default:
        return 'border-gray-200';
    }
  };

  const getPriorityLabel = (priority: Project['priority']) => {
    switch (priority) {
      case 'critical':
        return 'Crítica';
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return priority;
    }
  };

  const getSoftwareTypeIcon = (type: Project['softwareType']) => {
    switch (type) {
      case 'web':
        return '🌐';
      case 'mobile':
        return '📱';
      case 'desktop':
        return '💻';
      case 'api':
        return '🔌';
      case 'database':
        return '🗄️';
      case 'devops':
        return '⚙️';
      default:
        return '📦';
    }
  };

  const getSoftwareTypeLabel = (type: Project['softwareType']) => {
    switch (type) {
      case 'web':
        return 'Aplicação Web';
      case 'mobile':
        return 'App Mobile';
      case 'desktop':
        return 'App Desktop';
      case 'api':
        return 'API/Backend';
      case 'database':
        return 'Banco de Dados';
      case 'devops':
        return 'DevOps/Infraestrutura';
      default:
        return type;
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return <Calendar className="w-4 h-4" />;
      case 'in-progress':
        return <Play className="w-4 h-4" />;
      case 'testing':
        return <Code className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'on-hold':
        return <Pause className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className={`bg-white rounded-xl shadow-sm border-l-4 ${getPriorityColor(project.priority)} border-r border-t border-b border-gray-100 hover:shadow-md transition-all duration-200`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <span className="text-2xl">{getSoftwareTypeIcon(project.softwareType)}</span>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span>{getStatusLabel(project.status)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex items-center space-x-6 text-xs text-gray-500">
                  <span>{getSoftwareTypeLabel(project.softwareType)}</span>
                  <span>Prioridade: {getPriorityLabel(project.priority)}</span>
                  <span>{project.team.length} membro{project.team.length !== 1 ? 's' : ''}</span>
                  <span>Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                  <span>Fim: {new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{project.progress}%</div>
                <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => {
                        onEdit(project);
                        setShowMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Editar Projeto</span>
                    </button>
                    <button
                      onClick={() => {
                        onDelete(project.id);
                        setShowMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Excluir Projeto</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 ${getPriorityColor(project.priority)} border-r border-t border-b border-gray-100 hover:shadow-md transition-all duration-200 group`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getSoftwareTypeIcon(project.softwareType)}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500">{getSoftwareTypeLabel(project.softwareType)}</p>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    onEdit(project);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Editar Projeto</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(project.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir Projeto</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            <span>{getStatusLabel(project.status)}</span>
          </div>
          <span className="text-sm text-gray-500">{project.progress}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Fim:</span>
            <span>{new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Users className="w-3 h-3" />
            <span>{project.team.length} membro{project.team.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Code className="w-3 h-3" />
            <span>{project.technologies.slice(0, 2).join(', ')}</span>
            {project.technologies.length > 2 && (
              <span>+{project.technologies.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};