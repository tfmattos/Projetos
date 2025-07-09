import { useState } from "react";
import { adicionarProjeto } from "@/services/googleSheets";

function ProjectForm() {
  const [form, setForm] = useState({
    ID: "",
    Nome: "",
    Descricao: "",
    Inicio: "",
    Fim: "",
    Status: "",
    Tipo: "",
    Progresso: "",
    Marcos: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await adicionarProjeto(form);
      alert("Projeto salvo com sucesso!");
      setForm({
        ID: "",
        Nome: "",
        Descricao: "",
        Inicio: "",
        Fim: "",
        Status: "",
        Tipo: "",
        Progresso: "",
        Marcos: ""
      });
    } catch {
      alert("Erro ao salvar projeto.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Projeto</h2>
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label>{key}:</label>
          <input name={key} value={value} onChange={handleChange} />
        </div>
      ))}
      <button type="submit">Salvar</button>
    </form>
  );
}

export default ProjectForm;
