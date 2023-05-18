// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import db from "../db";
import ListaUnidades from "./ListaUnidades";
import "./Unidades.css";

function Unidades() {
  const [showForm, setShowForm] = useState(false);
  const [numeroUnidad, setNumeroUnidad] = useState("");
  const [selectedRutas, setSelectedRutas] = useState([]);
  //const [rutaPredeterminada, setRutaPredeterminada] = useState("");
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const roles = await db.rol.toArray();
      const rolUnico = roles.length > 0 ? roles[0] : null;
      const rutasPredeterminadas = rolUnico ? rolUnico.rutas : [];

      const unidades = await db.unidades.toArray();
      let numeroUnidades;
      const existeTacopan = unidades.some(
        (unidad) => unidad.ruta === "Tacopan"
      );
      if (existeTacopan) {
        numeroUnidades = unidades.length - 1;
      } else {
        numeroUnidades = unidades.length;
      }
      const indiceRutaPredeterminada =
        numeroUnidades % rutasPredeterminadas.length;

      //const rutaPre = rutasPredeterminadas[indiceRutaPredeterminada];

      const rutasRotadas = [
        ...rolUnico.rutas.slice(indiceRutaPredeterminada),
        ...rolUnico.rutas.slice(0, indiceRutaPredeterminada),
      ];

      setSelectedRutas(rutasRotadas);
      //setRutaPredeterminada(rutaPre);
      setUnidades(unidades); // Actualizar el estado 'unidades' con los datos obtenidos
    };
    fetchData();
  }, [unidades]);

  const handleAddUnidad = () => {
    setShowForm(true);
    setNumeroUnidad("");
  };

  const handleCancel = () => {
    setShowForm(false);
    setNumeroUnidad("");
  };

  const handleRutaChange = (e) => {
    const rutaSeleccionada = selectedRutas.find(
      (ruta) => ruta.ruta === e.target.value
    );
    setSelectedRutas([rutaSeleccionada]);
  };

  const handleSaveUnidad = async () => {
    const rutaSeleccionada = selectedRutas[0]; // Obtener la primera ruta seleccionada

    const fechaHoraActual = new Date(); // Obtener la fecha y hora actual
    const horaActual = fechaHoraActual.toLocaleTimeString(); // Convertir la hora actual a formato de cadena

    const newUnidad = {
      numeroUnidad,
      horaRegistro: horaActual, // Usar la hora actual como el valor de horaRegistro
      ruta: rutaSeleccionada ? rutaSeleccionada.ruta : "", // Verificar si rutaSeleccionada está definida
      color: rutaSeleccionada ? rutaSeleccionada.color : "", // Verificar si rutaSeleccionada está definida
    };

    await db.unidades.add(newUnidad);
    setShowForm(false);
    setNumeroUnidad("");

    const unidadesActualizadas = await db.unidades.toArray(); // Obtener la lista actualizada de unidades
    setUnidades(unidadesActualizadas); // Actualizar el estado 'unidades' con la lista actualizada
  };

  const handleDeleteUnidad = async (numeroUnidad) => {
    const unidadEliminada = unidades.find(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (unidadEliminada) {
      const indexEliminada = unidades.indexOf(unidadEliminada);
      const unidadesActualizadas = [...unidades];

      // Recorrer las unidades a partir del índice de la unidad eliminada
      for (let i = indexEliminada; i < unidadesActualizadas.length - 1; i++) {
        unidadesActualizadas[i].numeroUnidad =
          unidadesActualizadas[i + 1].numeroUnidad;
      }

      unidadesActualizadas.pop(); // Eliminar la última unidad del array
      setUnidades(unidadesActualizadas);

      // Guardar las unidades actualizadas en la base de datos
      await db.unidades.clear();
      await db.unidades.bulkAdd(unidadesActualizadas);
    }
  };

  const handleMoveUp = async (numeroUnidad) => {
    const indexUnidadSeleccionada = unidades.findIndex(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (indexUnidadSeleccionada > 0) {
      const unidadesActualizadas = [...unidades];
      const numeroUnidadActual =
        unidadesActualizadas[indexUnidadSeleccionada].numeroUnidad;
      const numeroUnidadAnterior =
        unidadesActualizadas[indexUnidadSeleccionada - 1].numeroUnidad;

      unidadesActualizadas[indexUnidadSeleccionada].numeroUnidad =
        numeroUnidadAnterior;
      unidadesActualizadas[indexUnidadSeleccionada - 1].numeroUnidad =
        numeroUnidadActual;

      setUnidades(unidadesActualizadas);

      // Guardar las unidades actualizadas en la base de datos
      await db.unidades.clear();
      await db.unidades.bulkPut(unidadesActualizadas);
    }
  };

  const handleAssignTacopan = async (numeroUnidad) => {
    const unidadSeleccionada = unidades.find(
      (unidad) => unidad.numeroUnidad === numeroUnidad
    );

    if (unidadSeleccionada) {
      const indexUnidadSeleccionada = unidades.indexOf(unidadSeleccionada);

      // Guardar la ruta y el color actual de la unidad seleccionada
      let rutaActual = unidadSeleccionada.ruta;
      let colorActual = unidadSeleccionada.color;

      // Asignar "Tacopan" y su color a la unidad seleccionada
      unidadSeleccionada.ruta = "Tacopan";
      unidadSeleccionada.color = "#FEF304"; // Reemplaza "#FF0000" con el color deseado

      // Heredar las rutas y los colores anteriores a las unidades siguientes
      for (let i = indexUnidadSeleccionada + 1; i < unidades.length; i++) {
        const rutaAnterior = unidades[i].ruta;
        const colorAnterior = unidades[i].color;
        unidades[i].ruta = rutaActual;
        unidades[i].color = colorActual;
        rutaActual = rutaAnterior;
        colorActual = colorAnterior;
      }

      setUnidades([...unidades]);

      // Guardar las unidades actualizadas en la base de datos
      await db.unidades.clear();
      await db.unidades.bulkPut(unidades);
    }
  };

  return (
    <div className="unidades-container">
      {!showForm && (
        <div className="add-button-container">
        <button className="add-button" onClick={handleAddUnidad}>
          Agregar Unidad
        </button>
        </div>
      )}
      
      {showForm && (
        <form className="unidad-form">
          <div className="form-group">
            {/*<label htmlFor="numeroUnidad">Número de Unidad:</label>*/}
            <input
              name="numeroUnidad"
              type="text"
              id="numeroUnidad"
              placeholder="Número de Unidad"
              value={numeroUnidad}
              onChange={(e) => setNumeroUnidad(e.target.value)}
              inputMode="numeric" // Establecer el modo de entrada como numérico
            />
          </div>
          <div className="form-group">
            {/*<label>Rutas:</label>*/}
            <select id="ruta" name="ruta" onChange={handleRutaChange}>
              {/* <option value={rutaPredeterminada.ruta}>
                {rutaPredeterminada.ruta}
              </option> */}
              {selectedRutas.map((ruta, index) => (
                <option key={index} value={ruta.ruta} data-color={ruta.color}>
                  {ruta.ruta}
                </option>
              ))}
            </select>
          </div>
          <div className="form-buttons">
            <button
              className="cancel-button"
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              className="save-button"
              type="button"
              onClick={handleSaveUnidad}
            >
              Guardar
            </button>
          </div>
        </form>
      )}
      <div className="unidad-table">
        <ListaUnidades
          unidades={unidades}
          onDeleteUnidad={handleDeleteUnidad}
          onMoveUp={handleMoveUp}
          onAssignTacopan={handleAssignTacopan}
        ></ListaUnidades>
      </div>
    </div>
  );
}

export default Unidades;
