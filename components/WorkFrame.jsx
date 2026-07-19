/**
 * Editorial matte frame for project screenshots.
 * Use as="button" for clickable images (lightbox), as="div" for static frames.
 */
export const WorkFrame = ({
  as: Component = "div",
  className = "",
  staticFrame = false,
  children,
  ...props
}) => {
  return (
    <Component
      className={`work-frame ${staticFrame ? "work-frame--static" : ""} ${className}`.trim()}
      {...props}
    >
      <span className="work-frame__corner work-frame__corner--tl" aria-hidden="true" />
      <span className="work-frame__corner work-frame__corner--tr" aria-hidden="true" />
      <span className="work-frame__corner work-frame__corner--bl" aria-hidden="true" />
      <span className="work-frame__corner work-frame__corner--br" aria-hidden="true" />
      <div className="work-frame__media">{children}</div>
    </Component>
  );
};
