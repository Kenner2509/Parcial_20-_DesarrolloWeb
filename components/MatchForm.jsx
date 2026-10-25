import { useState } from "react";

const esEnteroNoNegativo = (v) => /^\d+$/.test(v.trim());

export default function MatchForm({ teams, onAdd }) {
  const [localId, setLocalId] = useState("");
  const [visitanteId, setVisitanteId] = useState("");
  const [golesLocal, setGolesLocal] = useState("");
  const [golesVisitante, setGolesVisitante] = useState("");
  const [errores, setErrores] = useState([]);

  const validar = () => {
    const e = [];
    if (!localId) e.push("Elige el equipo local.");
    if (!visitanteId) e.push("Elige el equipo visitante.");
    if (localId && localId === visitanteId)
      e.push("El equipo local y el visitante deben ser distintos.");
    if (!esEnteroNoNegativo(golesLocal) || !esEnteroNoNegativo(golesVisitante))
      e.push("Los marcadores deben ser números enteros iguales o mayores a 0.");
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    if (e.length > 0) return;

    onAdd({
      localId,
      visitanteId,
      golesLocal: parseInt(golesLocal, 10),
      golesVisitante: parseInt(golesVisitante, 10),
    });
    setLocalId(""); setVisitanteId(""); setGolesLocal(""); setGolesVisitante("");
  };

  const selectEquipo = (value, setValue, etiqueta) => (
    <label className="field">
      <span>{etiqueta}</span>
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="">Selecciona…</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>{t.nombre}</option>
        ))}
      </select>
    </label>
  );

  const inputGoles = (value, setValue, etiqueta) => (
    <label className="field goles">
      <span>{etiqueta}</span>
      <input
        type="text" inputMode="numeric" placeholder="0"
        value={value} onChange={(e) => setValue(e.target.value)}
      />
    </label>
  );

  return (
    <section aria-labelledby="t-registro">
      <h2 id="t-registro">Registrar partido</h2>
      <form className="match-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          {selectEquipo(localId, setLocalId, "Local")}
          {inputGoles(golesLocal, setGolesLocal, "Goles")}
        </div>
        <div className="form-row">
          {selectEquipo(visitanteId, setVisitanteId, "Visitante")}
          {inputGoles(golesVisitante, setGolesVisitante, "Goles")}
        </div>
        {errores.length > 0 && (
          <ul className="errors" role="alert">
            {errores.map((m) => <li key={m}>{m}</li>)}
          </ul>
        )}
        <button type="submit" className="btn-primary">Guardar resultado</button>
      </form>
    </section>
  );
}
