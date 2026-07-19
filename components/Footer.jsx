export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__brand">JUBET.</p>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Jubet Aceberos. Crafted with care.
        </p>
      </div>
    </footer>
  );
};
