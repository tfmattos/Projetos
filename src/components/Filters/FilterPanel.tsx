import React from 'react';
import { X } from 'lucide-react';
import { Project } from '../../types/Project';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    status: Project['status'][];
    softwareType: Project['softwareType'][];
    priority: Project['priority'][];
  };
  onFilterChange: (filters: {
    status: Project['status'][];
    softwareType: Project['softwareType'][];
    priority: Project['priority'][];
  }) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange
}) => {
  if (!isOpen) return null;

  const statusOptions: { value: Project['status']; label: string }[] = [
    { value: 'planning', label: 'Planejamento' },
    { value: 'in-progress', label: 'Em Andamento' },
    { value: 'testing', label: 'Testando' },
    { value: 'completed', label: 'Concluído' },
    { value: 'on-hold', label: 'Pausado' }
  ];

  const softwareTypeOptions: { value: Project['softwareType']; label: string }[] = [
    { value: 'web', label: 'Aplicação Web' },
    { value: 'mobile', label: 'App Mobile' },
    { value: 'desktop', label: 'App Desktop' },
    { value: 'api', label: 'API/Backend' },
    { value: 'database', label: 'Banco de Dados' },
    { value: 'devops', label: 'DevOps/Infraestrutura' }
  ];

  const priorityOptions: { value: Project['priority']; label: string }[] = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'critical', label: 'Crítica' }
  ];

  const handleStatusToggle = (status: Project['status']) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    onFilterChange({ ...filters, status: newStatus });
  };

  const handleSoftwareTypeToggle = (type: Project['softwareType']) => {
    const newTypes = filters.softwareType.includes(type)
      ? filters.softwareType.filter(t => t !== type)
      : [...filters.softwareType, type];
    
    onFilterChange({ ...filters, softwareType: newTypes });
  };

  const handlePriorityToggle = (priority: Project['priority']) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    
    onFilterChange({ ...filters, priority: newPriorities });
  };

  const clearAllFilters = () => {
    onFilterChange({
      status: [],
      softwareType: [],
      priority: []
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end p-4 z-50">
      <div className="bg-white rounded-xl w-80 max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Filtro de Status */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Status</h3>
            <div className="space-y-2">
              {statusOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(option.value)}
                    onChange={() => handleStatusToggle(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtro de Tipo de Software */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Tipo de Software</h3>
            <div className="space-y-2">
              {softwareTypeOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.softwareType.includes(option.value)}
                    onChange={() => handleSoftwareTypeToggle(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtro de Prioridade */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Prioridade</h3>
            <div className="space-y-2">
              {priorityOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.priority.includes(option.value)}
                    onChange={() => handlePriorityToggle(option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={clearAllFilters}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};