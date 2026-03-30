import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const [input, setInput] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleDelete = (index) => {
        const nuevaLista = todoList.filter((_, i) => i !== index);
        setTodoList(nuevaLista);
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (input.trim() !== "") {
                setTodoList([...todoList, input]);
                setInput("");
            } else {
                alert("El campo no puede estar vacío");
            }
        }
    };

    

    return (
        <div className="container-fluid row m-0 p-0">
            <div className="col-sm-12 col-md-9 col-lg-6 align-content-center m-auto">
                <p className="fs-3 mt-2">Agregar tarea</p>
                <div className="d-flex">
                    <input
                        value={input} className="form-control" type="text"
                        onChange={handleChange} onKeyDown={handleKeyDown}
                        placeholder="Escribe la tarea y pulsa enter para añadirla a la lista"
                    />
                </div>
                <ul className="list-group">
                    <div>
                        <p className="fs-3 mt-4">Lista de Tareas</p>
                    </div>

                    {todoList.length === 0 ? (
                        <p className="text-muted text-center mt-2">
                            No hay tareas pendientes
                        </p>
                    ) : (
                        todoList.map((todo, i) => (
                            <li
                                className="list-group-item d-flex justify-content-between align-items-center shadow-sm"
                                key={i}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {todo}
                                <div className="d-flex gap-1" style={{ visibility: hoveredIndex === i ? "visible" : "hidden" }}>
                                    <button onClick={() => handleDelete(i)} className="delete">
                                        X
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
                
                {todoList.length > 0 && (
                    <p className="text-muted text-start m-3">
                {todoList.length === 1 ? "1 tarea pendiente" : `${todoList.length} tareas pendientes`}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;