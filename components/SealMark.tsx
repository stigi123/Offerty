export function SealMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="30" fill="#7a2e2e" />
      <circle cx="32" cy="32" r="24" fill="none" stroke="#d4bc7a" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#f7f1e3" strokeWidth="0.6" />
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fill="#f7f1e3"
        fontFamily="Georgia, serif"
        fontSize="11"
        letterSpacing="1.5"
      >
        OF
      </text>
    </svg>
  );
}
