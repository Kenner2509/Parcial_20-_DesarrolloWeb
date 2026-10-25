# Explicación del proyecto: Panel de resultados de fútbol

Aplicación hecha con React (componentes funcionales y Hooks) que permite registrar los resultados de un torneo aficionado y consultar la tabla de posiciones. No usa backend: los datos se guardan en memoria mientras la aplicación está abierta.

### Componentes

- **App**: guarda el estado, define las funciones para agregar y eliminar partidos y calcula la tabla.
- **TeamList**: muestra los equipos en tarjetas con su escudo (`map` con `key` = id del equipo).
- **MatchForm**: formulario controlado (`onChange`, `onSubmit`). Valida con JavaScript que se elijan ambos equipos, que no sean el mismo y que los marcadores sean enteros no negativos (`/^\d+$/`). Muestra los errores y no guarda si hay alguno.
- **MatchHistory**: lista los partidos con escudos, nombres y marcador. Filtra por equipo y elimina con `onClick`. Muestra mensajes cuando no hay partidos o el equipo filtrado no tiene ninguno.
- **StandingsTable**: pinta la tabla ya calculada y avisa cuando aún no hay partidos.
- **Crest**: escudo SVG que recibe los colores y la sigla del equipo.

### Manejo del estado (`useState`)

- `matches` (en App): arreglo de partidos `{ id, localId, visitanteId, golesLocal, golesVisitante }`.
- `filtro` (en App): id del equipo seleccionado en el historial (`""` = todos).
- `teams` (en App): lista de equipos.
- El formulario guarda sus propios campos y errores con `useState`.
- Para agregar se crea un arreglo nuevo con el partido al inicio; para eliminar se usa `filter`. Nunca se modifica el arreglo original.
- `useRef` genera un `id` único incremental para cada partido y `useMemo` evita recalcular la tabla si `matches` no cambió.

### Cálculos

La tabla no se guarda en el estado: **se deriva de `matches`** en `utils/standings.js`, por eso se actualiza sola al registrar o eliminar un partido.

1. `map` crea una fila en cero por equipo.
2. `reduce` recorre los partidos y acumula PJ, PG, PE, PP, GF y GC de ambos equipos. Victoria = 3 pts, empate = 1, derrota = 0.
3. DG = GF − GC.
4. `sort` ordena por puntos, luego diferencia de goles, luego goles a favor.
