import React, { useState, useMemo } from 'react';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProjectsTab } from './components/Projects/ProjectsTab';
import { ProjectForm } from './components/Projects/ProjectForm';
import { FilterPanel } from './components/Filters/FilterPanel';
import { useProjects } from './hooks/useProjects';
import { Project, ProjectFormData } from './types/Project';

type ActiveTab = 'dashboard' | 'projects';

function App() {
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    status: Project['status'][];
    softwareType: Project['softwareType'][];
    priority: Project['priority'][];
  }>({
    status: [],
    softwareType: [],
    priority: []
  });

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Aplicar filtro de busca
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Aplicar filtro de status
    if (filters.status.length > 0) {
      filtered = filtered.filter(project => 
        filters.status.includes(project.status)
      );
    }

    // Aplicar filtro de tipo de software
    if (filters.softwareType.length > 0) {
      filtered = filtered.filter(project => 
        filters.softwareType.includes(project.softwareType)
      );
    }

    // Aplicar filtro de prioridade
    if (filters.priority.length > 0) {
      filtered = filtered.filter(project => 
        filters.priority.includes(project.priority)
      );
    }

    return filtered;
  }, [projects, searchTerm, filters]);

  const handleNewProject = () => {
    setEditingProject(null);
    setShowProjectForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };

  const handleSaveProject = (formData: ProjectFormData) => {
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleCancelForm = () => {
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      deleteProject(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando projetos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewProject={handleNewProject}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => setShowFilters(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <Dashboard
            projects={filteredProjects}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
          />
        ) : (
          <ProjectsTab
            projects={filteredProjects}
            onEditProject={handleEditProject}
            onDeleteProject={handleDeleteProject}
            onNewProject={handleNewProject}
          />
        )}
      </main>

      {showProjectForm && (
        <ProjectForm
          project={editingProject || undefined}
          onSave={handleSaveProject}
          onCancel={handleCancelForm}
        />
      )}

      <FilterPanel
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}

export default App;