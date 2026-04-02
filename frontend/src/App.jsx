import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://djangorest-crud.onrender.com/")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 Mis Proyectos</h1>

      {projects.map(project => (
        <div key={project.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "10px"
        }}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;