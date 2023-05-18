// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../clases.css'

function Rutas() {
  
  const rutas = [
    {
      ruta: 'Sosa',
      color: '#EA21F4',
      mensaje: 'Esta es la ruta 1'
    },
    {
      ruta: 'Calicapan',
      color: '#216BF4',
      mensaje: 'Esta es la ruta 2'
    },
    {
      ruta: 'Coahuixco',
      color: '#8EF421',
      mensaje: 'Esta es la ruta 3'
    },
    {
      ruta: 'Tezotepec',
      color: '#FD8A01',
      mensaje: 'Esta es la ruta 1'
    },
    {
      ruta: 'San Isidro',
      color: '#9A9D9A',
      mensaje: 'Esta es la ruta 2'
    },
  ];

  return (
    <div>
      <h2>Rutas</h2>
      <div className="ruta-container">
        {rutas.map((ruta, index) => (
          <div key={index} className="ruta-card" style={{backgroundColor: ruta.color}}>
            <p className="ruta-title">{ruta.ruta}</p>
            <p className="ruta-message">{ruta.mensaje}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
  export default Rutas;