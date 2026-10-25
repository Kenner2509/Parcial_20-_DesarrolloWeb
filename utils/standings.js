// Calcula la tabla de posiciones a partir de los equipos y los partidos.
export function calcularTabla(teams, matches) {
  // Fila en cero para cada equipo
  const filas = teams.map((t) => ({
    ...t, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0,
  }));
  const porId = Object.fromEntries(filas.map((f) => [f.id, f]));

  // reduce: recorre los partidos acumulando estadísticas en cada fila
  matches.reduce((acc, m) => {
    const local = acc[m.localId];
    const visita = acc[m.visitanteId];
    local.pj++; visita.pj++;
    local.gf += m.golesLocal; local.gc += m.golesVisitante;
    visita.gf += m.golesVisitante; visita.gc += m.golesLocal;

    if (m.golesLocal > m.golesVisitante) {
      local.pg++; local.pts += 3; visita.pp++;
    } else if (m.golesLocal < m.golesVisitante) {
      visita.pg++; visita.pts += 3; local.pp++;
    } else {
      local.pe++; visita.pe++; local.pts += 1; visita.pts += 1;
    }
    return acc;
  }, porId);

  filas.forEach((f) => { f.dg = f.gf - f.gc; });

  // Orden: puntos, diferencia de goles, goles a favor
  return [...filas].sort(
    (a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf
  );
}
