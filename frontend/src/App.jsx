import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tecnologia, setTecnologia] = useState("");

  const [editingId, setEditingId] = useState(null); // 👈 saber si editas

  // Obtener proyectos
  const fetchProjects = () => {
    fetch("https://djangorest-crud.onrender.com/api/projects/")
      .then(res => res.json())
      .then(data => setProjects(data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Crear o actualizar
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = editingId
      ? `https://djangorest-crud.onrender.com/api/projects/${editingId}/`
      : "https://djangorest-crud.onrender.com/api/projects/";

    const method = editingId ? "PATCH" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        tecnologia
      })
    })
    .then(res => res.json())
    .then(() => {
      resetForm();
      fetchProjects();
    });
  };

  // Eliminar
  const deleteProject = (id) => {
    fetch(`https://djangorest-crud.onrender.com/api/projects/${id}/`, {
      method: "DELETE"
    })
    .then(() => fetchProjects());
  };

  // Seleccionar para editar
  const selectProject = (project) => {
    setTitle(project.title);
    setDescription(project.description);
    setTecnologia(project.tecnologia);
    setEditingId(project.id);
  };

  // Reset formulario
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTecnologia("");
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px", background: "#1e1e1e", minHeight: "100vh", color: "white" }}>
      <h1>🚀 Mis Proyectos</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Tecnología"
          value={tecnologia}
          onChange={(e) => setTecnologia(e.target.value)}
        />
        <br /><br />

        <button type="submit">
          {editingId ? "Actualizar Proyecto" : "Crear Proyecto"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm} style={{ marginLeft: "10px" }}>
            Cancelar
          </button>
        )}
      </form>

      {/* LISTA */}
      {projects.map(project => (
        <div 
          key={project.id}
          style={{
            borderRadius: "15px",
            padding: "15px",
            margin: "10px 0",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            backgroundColor: "#333"
          }}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><strong>{project.tecnologia}</strong></p>

          <button onClick={() => selectProject(project)}>
            Editar
          </button>

          <button 
            onClick={() => deleteProject(project.id)}
            style={{ marginLeft: "10px", background: "red", color: "white" }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;