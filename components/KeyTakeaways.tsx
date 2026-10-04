interface KeyTakeawaysProps {
  title?: string;
  items: string[];
}

export default function KeyTakeaways({
  title = "Key Architecture Takeaways",
  items,
}: KeyTakeawaysProps) {
  return (
    <section
      aria-label="Key Takeaways"
      className="key-takeaways-box"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        padding: '16px 20px',
        margin: '24px 0 28px',
      }}
    >
      <div
        style={{
          fontSize: '0.95rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#38bdf8',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        {title}
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            style={{
              color: 'var(--text-secondary, #cbd5e1)',
              lineHeight: '1.6',
              fontSize: '0.92rem',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
