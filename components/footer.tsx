export const Footer = () => {
  return (
    <footer className="w-100 border-top py-4 bg-dark shadow-lg mt-auto">
      {/* mt-auto es la clave si usas flex en el padre */}
      <p className="text-secondary text-center mb-0">
        Developed by{" "}
        <span className="text-light fw-semibold">Sebastián Molina</span>
        <span className="mx-2 text-secondary opacity-50">|</span>
        <a
          href="https://sebastianmolina.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-info fw-bold text-decoration-none"
        >
          Portfolio
        </a>
      </p>
    </footer>
  );
};