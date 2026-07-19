export const SectionSeparator = ({ className = "" }) => {
  return (
    <div
      className={`section-separator ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="section-separator__rule" />
      <span className="section-separator__mark" />
    </div>
  );
};
