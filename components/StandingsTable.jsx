import Crest from "./Crest.jsx";

export default function StandingsTable({ tabla, hayPartidos }) {
  return (
    <section aria-labelledby="t-tabla">
      <h2 id="t-tabla">Tabla de posiciones</h2>
      {!hayPartidos && (
        <p className="empty">La tabla se llenará cuando registres partidos.</p>
      )}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="left">Equipo</th>
              <th title="Partidos jugados">PJ</th>
              <th title="Ganados">PG</th>
              <th title="Empatados">PE</th>
              <th title="Perdidos">PP</th>
              <th title="Goles a favor">GF</th>
              <th title="Goles en contra">GC</th>
              <th title="Diferencia de goles">DG</th>
              <th title="Puntos">Pts</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((f, i) => (
              <tr key={f.id}>
                <td>{i + 1}</td>
                <td className="left team-cell">
                  <Crest team={f} size={24} />
                  <span>{f.nombre}</span>
                </td>
                <td>{f.pj}</td>
                <td>{f.pg}</td>
                <td>{f.pe}</td>
                <td>{f.pp}</td>
                <td>{f.gf}</td>
                <td>{f.gc}</td>
                <td>{f.dg > 0 ? `+${f.dg}` : f.dg}</td>
                <td className="pts">{f.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
