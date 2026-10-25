export default function Crest({ team, size = 44 }) {
  if (team.escudo) {
    return (
      <img
        className="crest"
        src={team.escudo}
        alt={`Escudo de ${team.nombre}`}
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
      />
    );
  }

  return (
    <svg className="crest"
      width={size}
      height={size * 1.1}
      viewBox="0 0 48 53"
      role="img"
      aria-label={`Escudo de ${team.nombre}`}
    >
      <path d="M4 4h40v23c0 12-10 18-20 22C14 45 4 39 4 27z" fill={team.color} />
      <path d="M4 20h40v9H4z" fill={team.color2} opacity="0.95" />
      <path
        d="M4 4h40v23c0 12-10 18-20 22C14 45 4 39 4 27z"
        fill="none" stroke="#14201a" strokeWidth="2.5"
      />
      <text
        x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="800"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fill={team.color} letterSpacing="0.5"
      >
        {team.sigla}
      </text>
    </svg>
  );
}