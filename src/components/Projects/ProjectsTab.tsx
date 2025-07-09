import { useEffect, useState } from "react";
import { fetchProjetos } from "@/services/googleSheets";

function ProjectsTab() {
  const [projetos, setProjetos] = useState<any[]>([]);

  useEffect(() => {
    fetchProjetos()
      .then(setProjetos)
      .catch((err) => console.error("Erro ao carregar projetos", err));
  }, []);

  return (
    <div>
      <h2>Projetos da Planilha</h2>
      {projetos.map((proj) => (
        <div key={proj.ID} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <h3>{proj.Nome}</h3>
          <p>{proj.Descricao}</p>
          <p>Status: {proj.Status} - {proj.Progresso}%</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectsTab;
