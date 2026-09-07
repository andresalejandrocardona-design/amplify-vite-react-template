import { useState } from "react";

interface Despliegue {
  id: string;
  nombre: string;
  responsable: string;
  fechaHora: string;
  descripcion: string;
}

function App() {
  const [despliegues, setDespliegues] = useState<Despliegue[]>([
    {
      id: "1",
      nombre: "Prueba en Entorno DEV",
      responsable: "Desarrollador QA",
      fechaHora: new Date().toISOString(),
      descripcion: "Probando cambios visuales en la rama de desarrollo."
    }
  ]);

  const [formData, setFormData] = useState({
    nombre: "",
    responsable: "",
    fechaHora: "",
    descripcion: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoDespliegue: Despliegue = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      responsable: formData.responsable,
      fechaHora: formData.fechaHora,
      descripcion: formData.descripcion
    };

    setDespliegues([nuevoDespliegue, ...despliegues]);
    setFormData({ nombre: "", responsable: "", fechaHora: "", descripcion: "" });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto", backgroundColor: "#1e1e1e", color: "#ffffff", borderRadius: "8px" }}>
      
      {/* Banner de aviso de Desarrollo */}
      <div style={{ border: "2px solid red", padding: "1rem", borderRadius: "8px", textAlign: "center", marginBottom: "1.5rem", backgroundColor: "#2b0000" }}>
        <h1 style={{ color: "#ff4d4d", margin: 0, fontSize: "1.8rem" }}>⚠️ ENTORNO DE DESARROLLO ⚠️</h1>
        <p style={{ margin: "0.5rem 0 0 0", color: "#ffcccc" }}>Esta es una versión de pruebas (Rama dev)</p>
      </div>

      <h2>🚀 Registro de Pases a Producción (DEV)</h2>

      <div style={{ background: "#2d2d2d", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem", border: "1px solid #444" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          <label style={{ fontWeight: "bold", color: "#ff8080" }}>Nombre del Despliegue:</label>
          <input
            type="text"
            placeholder="Ej. Feature nueva interfaz"
            value={formData.nombre}
            onChange={e => setFormData({...formData, nombre: e.target.value})}
            required
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #555", backgroundColor: "#3c3c3c", color: "white" }}
          />

          <label style={{ fontWeight: "bold", color: "#ff8080" }}>Responsable:</label>
          <input
            type="text"
            placeholder="Ej. Ana Martínez (DEV)"
            value={formData.responsable}
            onChange={e => setFormData({...formData, responsable: e.target.value})}
            required
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #555", backgroundColor: "#3c3c3c", color: "white" }}
          />

          <label style={{ fontWeight: "bold", color: "#ff8080" }}>Fecha y Hora:</label>
          <input
            type="datetime-local"
            value={formData.fechaHora}
            onChange={e => setFormData({...formData, fechaHora: e.target.value})}
            required
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #555", backgroundColor: "#3c3c3c", color: "white" }}
          />

          <label style={{ fontWeight: "bold", color: "#ff8080" }}>Descripción:</label>
          <textarea
            placeholder="Describe las pruebas..."
            value={formData.descripcion}
            onChange={e => setFormData({...formData, descripcion: e.target.value})}
            required
            style={{ padding: "0.5rem", minHeight: "80px", borderRadius: "4px", border: "1px solid #555", backgroundColor: "#3c3c3c", color: "white" }}
          />

          <button
            type="submit"
            style={{ padding: "0.8rem", background: "#d9534f", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}>
            Registrar Pruebas en DEV
          </button>
        </form>
      </div>

      <h2>📋 Historial (Pruebas)</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {despliegues.map((d) => (
          <li key={d.id} style={{ borderBottom: "1px solid #444", padding: "1rem 0" }}>
            <strong style={{ fontSize: "1.1rem", color: "#ff8080" }}>{d.nombre}</strong> <br/>
            <small style={{ color: "#aaa" }}>👤 <strong>Responsable:</strong> {d.responsable} | 🕒 <strong>Fecha:</strong> {new Date(d.fechaHora).toLocaleString()}</small><br/>
            <p style={{ marginTop: "0.5rem", color: "#ddd" }}>📝 {d.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;