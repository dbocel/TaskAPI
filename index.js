const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('no conozco que es API, pero aqui vamos aprendiendo, Bienvenidos!.');
});

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ tasks: rows });
    }
  });
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio.' });
  }

  const query = `INSERT INTO tasks (title, description, dueDate) VALUES (?, ?, ?)`;
  db.run(query, [title, description, dueDate], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Tarea creada', taskId: this.lastID });
    }
  });
});

// Obtener una tarea por ID
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: 'Tarea no encontrada.' });
    } else {
      res.json(row);
    }
  });
});

// Actualizar una tarea por ID
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'Todos los campos (title, description, dueDate) son obligatorios.' });
  }

  const query = `UPDATE tasks SET title = ?, description = ?, dueDate = ? WHERE id = ?`;

  db.run(query, [title, description, dueDate, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Tarea no encontrada.' });
    } else {
      res.json({ message: 'Tarea actualizada exitosamente.' });
    }
  });
});

// Eliminar una tarea por ID
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Tarea no encontrada.' });
    } else {
      res.json({ message: 'Tarea eliminada.' });
    }
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
