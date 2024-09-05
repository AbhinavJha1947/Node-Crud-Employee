const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const Employee = require('./models/employee')(db.sequelize, db.Sequelize.DataTypes);

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Test database connection
db.sequelize.sync().then(() => {
  console.log("Database connected successfully.");
}).catch(err => {
  console.error("Unable to connect to the database:", err);
});

// Create a new Employee
app.post('/employees', async (req, res) => {
  try {
    const { name, email, phone, linkedinUrl } = req.body;
    const employee = await Employee.create({ name, email, phone, linkedinUrl });
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Employee by ID
app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Employee
app.put('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      const { name, email, phone, linkedinUrl } = req.body;
      await employee.update({ name, email, phone, linkedinUrl });
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      await employee.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
