/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
//import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faArrowUp,
  faMountainSun,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ListaUnidades.css";

// Agrega los íconos a la biblioteca
//library.add(faTrash, faArrowUp, faBars);

function ListaUnidades({
  unidades,
  onDeleteUnidad,
  onMoveUp,
  onAssignTacopan,
}) {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleDelete = (numeroUnidad) => {
    onDeleteUnidad(numeroUnidad);
  };

  const handleMoveUp = (numeroUnidad) => {
    onMoveUp(numeroUnidad);
  };

  const handleStartTimer = () => {
    setIsRunning(true);
  };

  /* const handleStopTimer = () => {
    setIsRunning(false);
    setTimer(0);
  }; */

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <table className="unit-table">
        <tbody>
          {unidades.map((unidad, index) => (
            <tr
              className="unit-row"
              key={index}
              style={{ backgroundColor: unidad.color }}
            >
              <td className="unit-cell" style={{ backgroundColor: "#98F7EF" }}>
                {index + 1}
              </td>
              <td className="unit-cell">{unidad.numeroUnidad}</td>
              <td className="unit-cell">
                <button
                  className="button-delete"
                  onClick={() => handleDelete(unidad.numeroUnidad)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="button-move-up"
                  onClick={() => handleMoveUp(unidad.numeroUnidad)}
                >
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button
                  className="button-assign-tacopan"
                  onClick={() => onAssignTacopan(unidad.numeroUnidad)}
                >
                  <FontAwesomeIcon icon={faMountainSun} />
                </button>
                {index === 0 && (
                <button className="button-timer" onClick={handleStartTimer}><FontAwesomeIcon icon={faStopwatch} /> {formatTime(timer)}</button>)}
                {/* <button onClick={handleStopTimer}>Detener cronómetro</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUnidades;