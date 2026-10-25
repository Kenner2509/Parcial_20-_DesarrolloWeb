import { useMemo, useRef, useState } from "react";
import { TEAMS } from "/data/teams.js";
import { calcularTabla } from "/utils/standings.js";
import TeamList from "/components/TeamList.jsx";
import MatchForm from "/components/MatchForm.jsx";
import MatchHistory from "/components/MatchHistory.jsx";
import StandingsTable from "/components/StandingsTable.jsx";

export default function App() {
  const [teams] = useState(TEAMS);
  const [matches, setMatches] = useState([]);
  const [filtro, setFiltro] = useState("");
  const nextId = useRef(1); // ids únicos para cada partido

  const agregarPartido = (datos) => {
    setMatches((prev) => [{ id: nextId.current++, ...datos }, ...prev]);
  };

  const eliminarPartido = (id) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
  };

  // La tabla se recalcula sola cada vez que cambia la lista de partidos
  const tabla = useMemo(() => calcularTabla(teams, matches), [teams, matches]);

  return (
    <div className="app">
      <header className="top">
        <h1>Liga del Atlantico</h1>
        <p>Registra los marcadores y la tabla se actualiza sola.</p>
      </header>

      <main className="layout">
        <div className="col-main">
          <StandingsTable tabla={tabla} hayPartidos={matches.length > 0} />
          <MatchHistory
            matches={matches}
            teams={teams}
            filtro={filtro}
            onFiltro={setFiltro}
            onDelete={eliminarPartido}
          />
        </div>
        <aside className="col-side">
          <MatchForm teams={teams} onAdd={agregarPartido} />
          <TeamList teams={teams} />
        </aside>
      </main>
    </div>
  );
}
