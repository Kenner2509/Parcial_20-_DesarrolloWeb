import Crest from "./Crest.jsx";

export default function TeamList({ teams }) {
  return (
    <section aria-labelledby="t-equipos">
      <h2 id="t-equipos">Equipos</h2>
      <ul className="teams">
        {teams.map((t) => (
          <li key={t.id} className="team-card">
            <Crest team={t} size={52} />
            <span>{t.nombre}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
