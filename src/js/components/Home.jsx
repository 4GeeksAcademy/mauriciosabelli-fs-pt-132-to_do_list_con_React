import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";



const Home = () => {

	const [input, setInput] = useState("");
	const [todoList, setTodoList] = useState([]);

	const [editIndex, setEditIndex] = useState(null);
	const [editValue, setEditValue] = useState("");


	const handleDelete = (index) => {
		const nuevaLista = todoList.filter((_, i) => i !== index);
		setTodoList(nuevaLista);
	};


	const handleChange = (event) => {
		setInput(event.target.value)
	}


	const handleSubmit = (e) => {
		e.preventDefault()
		//Antes de agregarlo, vamos a verificar que el input no este vacio
		if (input.trim() !== "") {
			//Aca se agrega
			setTodoList([...todoList, input])
			setInput("");
		} else {
			//Mensaje de error
			alert("Este campo no puede estar vacío")
		}

	}

	const handleEdit = (index) => {
		setEditIndex(index);
		setEditValue(todoList[index]);
	};

	const handleSave = (index) => {
		const nuevaLista = [...todoList];
		nuevaLista[index] = editValue;
		setTodoList(nuevaLista);
		setEditIndex(null);
		setEditValue("");
	};


	return (
		<div className="container row">
			<div className="col-sm-12 col-md-9 col-lg-6 align-content-center m-auto">
				<p className="fs-3 mt-2">Nueva tarea</p>
				<form className="d-flex" onSubmit={handleSubmit}>
					<input value={input} className="form-control" type="text" onChange={handleChange}></input>
					<button type="submit" className="btn btn-outline-primary ms-2">Añadir</button>
				</form>
				<ul className="list-group">
					<div>
						<p className="fs-3 mt-4">Tareas pendientes</p>
					</div>

					{todoList.map((todo, i) => (
						<li className="list-group-item d-flex justify-content-between align-items-center m-1 pe-1" key={i}>
							{editIndex === i ? (
								<>
									<input
										className="form-control me-2"
										value={editValue}
										onChange={(e) => setEditValue(e.target.value)}
									/>
									<button onClick={() => handleSave(i)} className="btn btn-success">
										Guardar
									</button>
								</>
							) : (
								<>
									{todo}
									<div className="d-flex gap-1">
										<button onClick={() => handleEdit(i)} className="btn btn-primary">
											<FontAwesomeIcon icon={faPen} />
										</button>
										<button onClick={() => handleDelete(i)} className="btn btn-primary">
											<FontAwesomeIcon icon={faTrash} />
										</button>
									</div>
								</>
							)}
						</li>
					))}
				</ul>
				<p className="text-muted text-center mt-2 me-2">
    				{todoList.length} tareas pendientes
				</p>
			</div>
		</div>
	);
};

export default Home;