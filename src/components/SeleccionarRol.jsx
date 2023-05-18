// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import db from '../db';

function SeleccionarRol() {
  const [roles, setRoles] = useState([]);
  const [rolSeleccionado, setRolSeleccionado] = useState(null);

  useEffect(() => {
    // Obtener los roles de la base de datos
    db.roles.toArray().then((roles) => {
      setRoles(roles);
    });
  }, []);

  const handleChange = (event) => {
    const idRolSeleccionado = parseInt(event.target.value);
    // Buscar el rol seleccionado por su id y asignarlo al estado
    const rol = roles.find((r) => r.id === idRolSeleccionado);
    setRolSeleccionado(rol);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rolSeleccionado) {
      // Borrar todos los registros de la tabla 'rol'
      db.rol.clear().then(() => {
        // Guardar el rol seleccionado en la base de datos
        db.rol.add(rolSeleccionado).then(() => {
          console.log('Rol seleccionado guardado en la base de datos');
        }).catch((error) => {
          console.error('Error al guardar el rol seleccionado en la base de datos:', error);
        });
      }).catch((error) => {
        console.error('Error al borrar los registros de la tabla "rol":', error);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Selecciona un rol:
        <select value={rolSeleccionado ? rolSeleccionado.id : ''} onChange={handleChange}>
          <option value="">-- Seleccione un rol --</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Guardar rol seleccionado</button>
    </form>
  );
}

export default SeleccionarRol;