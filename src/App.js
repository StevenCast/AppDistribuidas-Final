import React from 'react';
import Formulario from './components/Formulario';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="hero">
        <h1>Exploración Cósmica</h1>
        <p>Descubre, registra y comparte los misterios del universo.</p>
        <p>Instancia activa: {process.env.REACT_APP_INSTANCE_ID}</p>
      </header>

      <div className="content">
        {/* Sección de texto a la izquierda */}
        <div className="text-content">
          <section className="introduction">
            <h2>Bienvenido a la Exploración del Cosmos</h2>
            <p>
              La astronomía nos permite ver más allá de nuestro mundo y comprender
              los secretos del universo. Únete a nuestra comunidad de exploradores
              y empieza a documentar tus descubrimientos.
            </p>
          </section>

          <section className="highlights">
            <h2>Características del Registro Astronómico</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🌌 Cielo Nocturno</h3>
                <p>Registra eventos estelares y lluvias de meteoros en tiempo real.</p>
              </div>
              <div className="feature-card">
                <h3>🔭 Observaciones</h3>
                <p>Comparte detalles de tus observaciones astronómicas con la comunidad.</p>
              </div>
              <div className="feature-card">
                <h3>🛰️ Noticias Espaciales</h3>
                <p>Mantente informado sobre los últimos descubrimientos y misiones espaciales.</p>
              </div>
              <div className="image-container">
                <img src="https://www.astroshop.es/CMS/images/text/category/frau_teleskop_daemmerung_stern_shutterstock_AstroStar_all.jpg" alt="Exploración del Universo" className="astro-image" />
              </div>
            </div>
          </section>
        </div>

        {/* Formulario a la derecha */}
        <Formulario />
      </div>

    </div>
  );
}

export default App;
