import React from 'react';
import { Project, Epic, Feature } from '../../types/Project';
import { X, Calendar, Clock, CheckCircle, AlertCircle, User, DollarSign } from 'lucide-react';

interface ProjectDetailsModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
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

  const getStatusLabel = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return <Calendar className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'testing':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'on-hold':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getCostTypeLabel = (type: string) => {
    switch (type) {
      case 'avoided':
        return 'Custo Evitado';
      case 'investment':
        return 'Investimento';
      case 'operational':
        return 'Operacional';
      default:
        return type;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
            <p className="text-gray-600 mt-1">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Informações Gerais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Status do Projeto</h3>
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span>{getStatusLabel(project.status)}</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progresso</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Cronograma</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Início:</span>
                  <span className="font-medium">{new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fim:</span>
                  <span className="font-medium">{new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-medium">
                    {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24))} dias
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Equipe</h3>
              <div className="space-y-2">
                {project.team.slice(0, 3).map((member, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{member}</span>
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{project.team.length - 3} outros membros
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Informações Financeiras */}
          {project.hasCostBenefit && project.costBenefit && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Análise Financeira</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Tipo de Custo</div>
                  <div className="font-semibold text-gray-900">{getCostTypeLabel(project.costBenefit.costType)}</div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Custo Estimado</div>
                  <div className="font-semibold text-red-600">
                    R$ {project.costBenefit.estimatedCost.toLocaleString('pt-BR')}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Retorno Estimado</div>
                  <div className="font-semibold text-green-600">
                    R$ {project.costBenefit.estimatedReturn.toLocaleString('pt-BR')}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">ROI Estimado</div>
                  <div className={`font-semibold ${
                    project.costBenefit.estimatedReturn > project.costBenefit.estimatedCost 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {project.costBenefit.estimatedCost > 0 
                      ? `${(((project.costBenefit.estimatedReturn - project.costBenefit.estimatedCost) / project.costBenefit.estimatedCost) * 100).toFixed(1)}%`
                      : 'N/A'
                    }
                  </div>
                </div>
              </div>
              {project.costBenefit.description && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Descrição</div>
                  <div className="text-gray-900">{project.costBenefit.description}</div>
                </div>
              )}
            </div>
          )}

          {/* Épicos e Features */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Épicos e Features</h3>
            
            {project.epics && project.epics.length > 0 ? (
              <div className="space-y-6">
                {project.epics.map((epic) => (
                  <div key={epic.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{epic.title}</h4>
                        <p className="text-gray-600 mt-1">{epic.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(epic.status)}`}>
                          {getStatusIcon(epic.status)}
                          <span>{getStatusLabel(epic.status)}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{epic.progress}% concluído</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Início: </span>
                        <span className="font-medium">{new Date(epic.startDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Fim: </span>
                        <span className="font-medium">{new Date(epic.endDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${epic.progress}%` }}
                      />
                    </div>

                    {/* Features do Épico */}
                    {epic.features && epic.features.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-medium text-gray-900 mb-3">Features</h5>
                        <div className="space-y-3">
                          {epic.features.map((feature) => (
                            <div key={feature.id} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h6 className="font-medium text-gray-900">{feature.title}</h6>
                                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                                  {getStatusIcon(feature.status)}
                                  <span>{getStatusLabel(feature.status)}</span>
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                              
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                                <div className="flex space-x-4">
                                  <span>Início: {new Date(feature.startDate).toLocaleDateString('pt-BR')}</span>
                                  <span>Fim: {new Date(feature.endDate).toLocaleDateString('pt-BR')}</span>
                                </div>
                                {feature.assignedTo && (
                                  <div className="flex items-center space-x-1">
                                    <User className="w-3 h-3" />
                                    <span>{feature.assignedTo}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex-1 mr-4">
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
                                      style={{ width: `${feature.progress}%` }}
                                    />
                                  </div>
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{feature.progress}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhum épico cadastrado para este projeto</p>
              </div>
            )}
          </div>

          {/* Tecnologias */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tecnologias Utilizadas</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};