import Crest from "./Crest.jsx";

export default function MatchHistory({ matches, teams, filtro, onFiltro, onDelete }) {
  const buscar = (id) => teams.find((t) => t.id === id);

  // filter: partidos donde participa el equipo seleccionado
  const visibles = filtro
    ? matches.filter((m) => m.localId === filtro || m.visitanteId === filtro)
    : matches;

  return (
    <section aria-labelledby="t-historial">
      <div className="section-head">
        <h2 id="t-historial">Historial</h2>
        <label className="field inline">
          <span>Filtrar por equipo</span>
          <select value={filtro} onChange={(e) => onFiltro(e.target.value)}>
            <option value="">Todos</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.nombre}</option>
            ))}
          </select>
        </label>
      </div>

      {matches.length === 0 ? (
        <p className="empty">Aún no hay partidos. Registra el primero en el formulario.</p>
      ) : visibles.length === 0 ? (
        <p className="empty">Este equipo no tiene partidos registrados.</p>
      ) : (
        <ul className="matches">
          {visibles.map((m) => {
            const L = buscar(m.localId);
            const V = buscar(m.visitanteId);
            return (
              <li key={m.id} className="match">
                <div className="side">
                  <Crest team={L} size={34} />
                  <span className="name">{L.nombre}</span>
                </div>
                <div className="score" aria-label={`${m.golesLocal} a ${m.golesVisitante}`}>
                  {m.golesLocal} <i>:</i> {m.golesVisitante}
                </div>
                <div className="side right">
                  <span className="name">{V.nombre}</span>
                  <Crest team={V} size={34} />
                </div>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(m.id)}
                  aria-label={`Eliminar ${L.nombre} ${m.golesLocal} a ${m.golesVisitante} ${V.nombre}`}
                >
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
