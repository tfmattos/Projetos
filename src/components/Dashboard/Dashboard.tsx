import React from 'react';
import { Project } from '../../types/Project';
import { StatsCard } from './StatsCard';
import { Timeline } from '../Timeline/Timeline';
import { TeamMembersPanel } from './TeamMembersPanel';
import { 
  FolderOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface DashboardProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  onEditProject,
  onDeleteProject
}) => {
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const delayedProjects = projects.filter(p => {
    const today = new Date();
    const endDate = new Date(p.endDate);
    return endDate < today && p.status !== 'completed';
  }).length;

  const averageProgress = projects.length > 0 
    ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
    : 0;

  const upcomingDeadlines = projects
    .filter(p => p.status !== 'completed')
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 3);

  // Calcular estatísticas financeiras
  const projectsWithCosts = projects.filter(p => p.hasCostBenefit && p.costBenefit);
  const totalEstimatedCost = projectsWithCosts.reduce((sum, p) => 
    sum + (p.costBenefit?.estimatedCost || 0), 0
  );
  const totalEstimatedReturn = projectsWithCosts.reduce((sum, p) => 
    sum + (p.costBenefit?.estimatedReturn || 0), 0
  );

  return (
    <div className="space-y-8">
      {/* Visão Geral das Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Projetos"
          value={totalProjects}
          icon={FolderOpen}
          color="bg-blue-500"
        />
        <StatsCard
          title="Projetos Ativos"
          value={activeProjects}
          icon={Clock}
          color="bg-orange-500"
        />
        <StatsCard
          title="Concluídos"
          value={completedProjects}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatsCard
          title="Atrasados"
          value={delayedProjects}
          icon={AlertCircle}
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Cronograma dos Projetos</h2>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <Timeline 
              projects={projects} 
              onProjectClick={(project) => {
                // Implementar modal de detalhes do projeto
                console.log('Abrir detalhes do projeto:', project);
              }}
            />
          </div>
        </div>

        {/* Painel Lateral */}
        <div className="space-y-6">
          {/* Próximos Prazos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Próximos Prazos</h2>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.length > 0 ? (
                upcomingDeadlines.map((project) => (
                  <div key={project.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      project.priority === 'critical' ? 'bg-red-500' :
                      project.priority === 'high' ? 'bg-orange-500' :
                      project.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{project.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(project.endDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">Nenhum prazo próximo</p>
              )}
            </div>
          </div>

          {/* Progresso Geral */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Progresso Geral</h2>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{averageProgress}%</div>
              <p className="text-sm text-gray-600 mb-4">Média de conclusão de todos os projetos</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${averageProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Membros da Equipe */}
          <TeamMembersPanel projects={projects} />

          {/* Resumo Financeiro */}
          {projectsWithCosts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Custo Estimado</span>
                  <span className="font-medium text-red-600">
                    R$ {totalEstimatedCost.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Retorno Estimado</span>
                  <span className="font-medium text-green-600">
                    R$ {totalEstimatedReturn.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">ROI Estimado</span>
                    <span className={`font-bold ${
                      totalEstimatedReturn > totalEstimatedCost ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {totalEstimatedCost > 0 
                        ? `${(((totalEstimatedReturn - totalEstimatedCost) / totalEstimatedCost) * 100).toFixed(1)}%`
                        : 'N/A'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};