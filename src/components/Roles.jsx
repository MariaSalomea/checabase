// eslint-disable-next-line no-unused-vars
import React, { useState,useEffect } from "react";
import db from "../db";
import "./Roles.css";

function Roles() {

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

  const [nombreRol, setNombreRol] = useState("");
  const [rutasSeleccionadas, setRutasSeleccionadas] = useState([]);

  const [roles, setRoles] = useState([]);//Estado para los roles existentes en la db
  useEffect(() => {
    db.roles.toArray().then((roles) => {
      setRoles(roles);
    });
  }, []);

  const agregarRutaSeleccionada = (ruta) => {
    const rutaSeleccionada = rutas.find((r) => r.ruta === ruta);
    setRutasSeleccionadas([...rutasSeleccionadas, rutaSeleccionada]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Guardar el rol y las rutas seleccionadas en la base de datos
    await db.roles.add({ nombre: nombreRol, rutas: rutasSeleccionadas });

    // Limpiar el formulario
    setNombreRol("");
    setRutasSeleccionadas([]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del rol:
          <input
            type="text"
            value={nombreRol}
            onChange={(event) => setNombreRol(event.target.value)}
          />
        </label>
        <br />
        <label>
          Rutas:
          <select
            id="selectRutas"
            name="selectRutas"
            onChange={(event) => agregarRutaSeleccionada(event.target.value)}
          >
            <option value="">--Seleccionar ruta--</option>
            {rutas.map((ruta, index) => (
              <option key={index} value={ruta.ruta}>
                {ruta.ruta}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Guardar</button>
      </form>
      <br />
      <table>
        <thead>
          <tr>
            <th>Ruta</th>
            <th>Color</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {rutasSeleccionadas.map((ruta, index) => (
            <tr key={index} style={{ backgroundColor: ruta.color }}>
              <td>{ruta.ruta}</td>
              <td>{ruta.color}</td>
              <td>{ruta.mensaje}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Roles existentes</h2>
      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Rutas</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((rol) => (
          <tr key={rol.id}>
            <td>{rol.id}</td>
            <td>{rol.nombre}</td>
            <td>
              {rol.rutas.map((ruta, index) => (
                <div key={index} style={{ backgroundColor: ruta.color }}>
                  {ruta.ruta}
                </div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Roles;