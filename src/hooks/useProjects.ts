import { useState, useEffect } from 'react';
import { Project, ProjectFormData } from '../types/Project';

const STORAGE_KEY = 'project-roadmap-data';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProjects(JSON.parse(stored));
        } else {
          // Inicializar com dados de exemplo
          const sampleProjects: Project[] = [
            {
              id: '1',
              name: 'Plataforma E-commerce',
              description: 'Plataforma moderna de e-commerce com React e Node.js',
              softwareType: 'web',
              status: 'in-progress',
              priority: 'high',
              startDate: '2024-01-15',
              endDate: '2024-06-30',
              team: ['João Silva', 'Maria Santos', 'Pedro Costa'],
              technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
              progress: 65,
              milestones: [
                {
                  id: '1',
                  title: 'Planejamento do Projeto',
                  description: 'Planejamento inicial e levantamento de requisitos',
                  date: '2024-01-15',
                  completed: true,
                  type: 'planning'
                },
                {
                  id: '2',
                  title: 'Desenvolvimento Frontend',
                  description: 'Desenvolvimento da interface em React',
                  date: '2024-03-15',
                  completed: true,
                  type: 'development'
                },
                {
                  id: '3',
                  title: 'API Backend',
                  description: 'Desenvolvimento da API RESTful',
                  date: '2024-05-01',
                  completed: false,
                  type: 'development'
                }
              ],
              epics: [
                {
                  id: '1',
                  title: 'Sistema de Autenticação',
                  description: 'Implementar sistema completo de login e registro',
                  startDate: '2024-01-20',
                  endDate: '2024-02-15',
                  status: 'completed',
                  progress: 100,
                  features: [
                    {
                      id: '1',
                      title: 'Login de Usuário',
                      description: 'Tela de login com validação',
                      startDate: '2024-01-20',
                      endDate: '2024-01-25',
                      status: 'completed',
                      progress: 100,
                      assignedTo: 'João Silva'
                    },
                    {
                      id: '2',
                      title: 'Registro de Usuário',
                      description: 'Formulário de cadastro',
                      startDate: '2024-01-26',
                      endDate: '2024-02-05',
                      status: 'completed',
                      progress: 100,
                      assignedTo: 'Maria Santos'
                    }
                  ]
                },
                {
                  id: '2',
                  title: 'Catálogo de Produtos',
                  description: 'Sistema de exibição e busca de produtos',
                  startDate: '2024-02-16',
                  endDate: '2024-04-30',
                  status: 'in-progress',
                  progress: 70,
                  features: [
                    {
                      id: '3',
                      title: 'Listagem de Produtos',
                      description: 'Grid responsivo de produtos',
                      startDate: '2024-02-16',
                      endDate: '2024-03-15',
                      status: 'completed',
                      progress: 100,
                      assignedTo: 'Pedro Costa'
                    },
                    {
                      id: '4',
                      title: 'Filtros e Busca',
                      description: 'Sistema de filtros avançados',
                      startDate: '2024-03-16',
                      endDate: '2024-04-30',
                      status: 'in-progress',
                      progress: 40,
                      assignedTo: 'João Silva'
                    }
                  ]
                }
              ],
              hasCostBenefit: true,
              costBenefit: {
                estimatedCost: 150000,
                estimatedReturn: 500000,
                currency: 'BRL',
                costType: 'investment',
                description: 'Investimento em plataforma que aumentará vendas online em 300%'
              },
              createdAt: '2024-01-01',
              updatedAt: '2024-01-20'
            },
            {
              id: '2',
              name: 'App Bancário Mobile',
              description: 'Aplicativo bancário seguro para iOS e Android',
              softwareType: 'mobile',
              status: 'planning',
              priority: 'critical',
              startDate: '2024-02-01',
              endDate: '2024-09-30',
              team: ['Ana Oliveira', 'Carlos Ferreira'],
              technologies: ['React Native', 'Firebase', 'Stripe'],
              progress: 15,
              milestones: [
                {
                  id: '4',
                  title: 'Requisitos de Segurança',
                  description: 'Definir protocolos de segurança e conformidade',
                  date: '2024-02-15',
                  completed: true,
                  type: 'planning'
                },
                {
                  id: '5',
                  title: 'Design UI/UX',
                  description: 'Design da interface e experiência do usuário',
                  date: '2024-03-01',
                  completed: false,
                  type: 'planning'
                }
              ],
              epics: [
                {
                  id: '3',
                  title: 'Onboarding do Usuário',
                  description: 'Processo de cadastro e verificação',
                  startDate: '2024-02-01',
                  endDate: '2024-03-15',
                  status: 'planning',
                  progress: 0,
                  features: [
                    {
                      id: '5',
                      title: 'Verificação de Identidade',
                      description: 'Sistema de verificação por documento',
                      startDate: '2024-02-01',
                      endDate: '2024-02-20',
                      status: 'planning',
                      progress: 0,
                      assignedTo: 'Ana Oliveira'
                    }
                  ]
                }
              ],
              hasCostBenefit: true,
              costBenefit: {
                estimatedCost: 800000,
                estimatedReturn: 2000000,
                currency: 'BRL',
                costType: 'avoided',
                description: 'Redução de custos operacionais com atendimento digital'
              },
              createdAt: '2024-01-15',
              updatedAt: '2024-01-25'
            }
          ];
          setProjects(sampleProjects);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleProjects));
        }
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
  };

  const addProject = (projectData: ProjectFormData) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updatedProjects = projects.map(project =>
      project.id === id
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    );
    saveProjects(updatedProjects);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    saveProjects(updatedProjects);
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject
  };
};