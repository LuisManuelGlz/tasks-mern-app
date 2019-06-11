const mongoose = require('mongoose'); // requerimos de mongoose
const { Schema } = mongoose; // usamos el Schema de mongoose

// definimos un Schema para las tareas
const TaskSchema = new Schema({
    title: { type: String, required: true },       // título
    description: { type: String, required: true }, // descripción
    date: { type: Date, default: Date.now }        // fecha de creación
});

// exportamos el modelo
module.exports = mongoose.model('Task', TaskSchema);