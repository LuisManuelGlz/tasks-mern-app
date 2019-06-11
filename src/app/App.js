import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    // al momento que carga la página, se llama a fetchTasks para pintar las tareas
    componentDidMount() {
        this.fetchTasks();
    }

    handleChange(e) {
        const { name, value } = e.target; // llamamos los atributos del tag
        this.setState({
            [name]: value
        });
    }

    // método para obtener todas las tareas
    fetchTasks() {
        fetch('/tasks') // definimos la ruta
        .then(res => res.json()) // mostramos la respuesta que nos ha dado el servidor
        .then(data => {
            this.setState({tasks: data}); // asignamos las tareas al arreglo
        })
        .catch(err => console.log(err)); // si algo falla
    }

    // método para agregar una tarea
    addTask(e) {
        e.preventDefault(); // impedimos que se actualice la página
        
        if (this.state._id) {
            fetch(`/tasks/${this.state._id}`, { // definimos la ruta con el id de la tarea a actualizar
                method: 'put', // definimos el método put
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()) // mostramos la respuesta que nos ha dado el servidor
            .then(data => {
                console.log(data); // mostramos la tarea por consola
                // M.toast({html: 'Task updated'}); // materialize only
                this.setState({ // vaciamos el formulario
                    title: '',
                    description: '',
                    _id: ''
                });
                this.fetchTasks() // llamamos la lista de tareas (actualizada)
            })
            .catch(err => console.log(err)); // si algo falla
        } else {
            fetch('/tasks', {
                method: 'post', // definimos el metodo post
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()) // mostramos la respuesta que nos ha dado el servidor
            .then(data => {
                console.log(data) // mostramos la tarea por consola
                // M.toast({html: 'Task created'}); // materialize only
                this.setState({title: '', description: ''});
                this.fetchTasks(); // llamamos la lista de tareas (actualizada)
            })
            .catch(err => console.log(err)); // si algo falla
        }
    }

    // método para editar un tarea
    editTask(id) {
        fetch(`tasks/${id}`) // definimos la ruta con el id de la tarea a actualizar
        .then(res => res.json()) // mostramos la respuesta que nos ha dado el servidor
        .then(data => {
            console.log(data); // mostramos la tarea por consola
            this.setState({ // llenamos el formulario
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
        .catch(err => console.log(err)); // si algo falla
    }

    // método para eliminar una tarea
    deleteTask(id) {
        // preguntamos al usuario si quiere eliminar la tarea
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/tasks/${id}`, { // definimos la ruta con el id de la tarea a eliminar
                method: 'delete', // definimos el método delete
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json()) // mostramos la respuesta que nos ha dado el servidor
            .then(data => {
                console.log(data); // mostramos la tarea por consola
                // M.toast({html: 'Task deleted'}); // materialize only
                this.fetchTasks(); // llamamos la lista de tareas (actualizada)
            })
            .catch(err => console.log(err)); // si algo falla
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container">
                        <a href="/" className="navbar-brand">
                            MERN Tasks
                        </a>
                    </div>
                </nav>
                <div className="row">
                    <div className="col-sm-5">
                        {/* Este se podría considerar una app */}
                        <div className="card ml-sm-5">
                            <div className="card-body">
                                <form onSubmit={this.addTask}>
                                    <div className="form-group">
                                        <input 
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            onChange={this.handleChange}
                                            value={this.state.title}
                                            placeholder="Title" />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            onChange={this.handleChange}
                                            value={this.state.description}
                                            placeholder="Description" />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-dark btn-block">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        {/* Este se podría considerar una app */}
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // mapeo de las tareas
                                    this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-warning"
                                                        onClick={() => this.editTask(task._id)}>
                                                        <i className="fas fa-pencil-alt" />
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ml-1"
                                                        onClick={() => this.deleteTask(task._id)} >
                                                        <i className="fas fa-trash-alt" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

// exportamos la aplicación
export default App;