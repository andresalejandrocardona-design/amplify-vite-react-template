import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

// Generamos el cliente fuertemente tipado para interactuar con la API
const client = generateClient<Schema>();

function App() {
  const [despliegues, setDespliegues] = useState<Array<Schema["Despliegue"]["type"]>>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    responsable: "",
    fechaHora: "",
    descripcion: ""
  });

  // Escuchar cambios en tiempo real en la base de datos de Amplify
  useEffect(() => {
    const sub = client.models.Despliegue.observeQuery().subscribe({
      next: (data) => setDespliegues([...data.items]),
    });
    return () => sub.unsubscribe();
  }, []);

  // Guardar el registro en la base de datos de AWS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // AWS DateTime requiere formato ISO 8601
    const isoDate = new Date(formData.fechaHora).toISOString();

    await client.models.Despliegue.create({
      nombre: formData.nombre,
      responsable: formData.responsable,
      fechaHora: isoDate,
      descripcion: formData.descripcion
    });

    // Limpiar los campos del formulario
    setFormData({ nombre: "", responsable: "", fechaHora: "", descripcion: "" });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🚀 Registro de Pases a Producción</h1>
      
      <div style={{ background: "#f4f4f4", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          <label style={{ fontWeight: "bold" }}>Nombre del Despliegue:</label>
          <input 
            type="text" 
            placeholder="Ej. Release v1.2.0 - Pasarela de pago" 
            value={formData.nombre} 
            onChange={e => setFormData({...formData, nombre: e.target.value})} 
            required 
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
            
          <label style={{ fontWeight: "bold" }}>Responsable:</label>
          <input 
            type="text" 
            placeholder="Ej. Ana Martínez" 
            value={formData.responsable} 
            onChange={e => setFormData({...formData, responsable: e.target.value})} 
            required 
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
            
          <label style={{ fontWeight: "bold" }}>Fecha y Hora:</label>
          <input 
            type="datetime-local" 
            value={formData.fechaHora} 
            onChange={e => setFormData({...formData, fechaHora: e.target.value})} 
            required 
            style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
            
          <label style={{ fontWeight: "bold" }}>Descripción:</label>
          <textarea 
            placeholder="Describe las características principales o notas del despliegue..." 
            value={formData.descripcion} 
            onChange={e => setFormData({...formData, descripcion: e.target.value})} 
            required 
            style={{ padding: "0.5rem", minHeight: "80px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
            
          <button 
            type="submit" 
            style={{ padding: "0.8rem", background: "#ec7211", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", fontWeight: "bold" }}>
            Registrar Despliegue
          </button>
        </form>
      </div>

      <h2>📋 Historial de Despliegues</h2>
      {despliegues.length === 0 ? (
        <p style={{ color: "#777" }}>No hay despliegues registrados aún.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {despliegues.map((d) => (
            <li key={d.id} style={{ borderBottom: "1px solid #ddd", padding: "1rem 0" }}>
              <strong style={{ fontSize: "1.1rem" }}>{d.nombre}</strong> <br/>
              <small style={{ color: "#555" }}>👤 <strong>Responsable:</strong> {d.responsable} | 🕒 <strong>Fecha:</strong> {new Date(d.fechaHora).toLocaleString()}</small><br/>
              <p style={{ marginTop: "0.5rem", color: "#333" }}>📝 {d.descripcion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;