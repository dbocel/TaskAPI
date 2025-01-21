const express = require('express');
const app = express();

app.use(express.json()); // Middleware para procesar JSON

// Endpoint para recibir datos desde Power Automate
app.post('/create-task', (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
        return res.status(400).json({ error: 'Faltan datos necesarios' });
    }

    // Simular creación de tarea (lógica de integración con Planner iría aquí)
    console.log(`Creando tarea: ${title}, ${description}, fecha: ${dueDate}`);
    res.status(201).json({ message: 'Tarea creada correctamente en Planner' });
});
// Usar el puerto proporcionado por Railway, o 3000 por defecto
const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
/*
const express = require('express');
const app = express();

app.use(express.json()); // Middleware para procesar JSON

// Endpoint para recibir datos desde Power Automate
app.post('/create-task', (req, res) => {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
        return res.status(400).json({ error: 'Faltan datos necesarios' });
    }

    // Simular creación de tarea (lógica de integración con Planner iría aquí)
    console.log(`Creando tarea: ${title}, ${description}, fecha: ${dueDate}`);
    res.status(201).json({ message: 'Tarea creada correctamente en Planner' });
});

// Usar el puerto proporcionado por Railway, o 3000 por defecto
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
}).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err);
});*/