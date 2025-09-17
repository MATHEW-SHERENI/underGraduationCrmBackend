const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all students...');
    const students = await Student.getAll();
    console.log(`Found ${students.length} students`);
    res.json(students);
  } catch (error) {
    console.error('Error in GET /api/students:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.getById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error in GET /api/students/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new student
router.post('/', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    console.error('Error in POST /api/students:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.update(req.params.id, req.body);
    res.json(student);
  } catch (error) {
    console.error('Error in PUT /api/students/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add interaction
router.post('/:id/interactions', async (req, res) => {
  try {
    const interaction = await Student.addInteraction(req.params.id, req.body);
    res.status(201).json(interaction);
  } catch (error) {
    console.error('Error in POST /api/students/:id/interactions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add communication
router.post('/:id/communications', async (req, res) => {
  try {
    const communication = await Student.addCommunication(req.params.id, req.body);
    res.status(201).json(communication);
  } catch (error) {
    console.error('Error in POST /api/students/:id/communications:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add note
router.post('/:id/notes', async (req, res) => {
  try {
    const note = await Student.addNote(req.params.id, req.body);
    res.status(201).json(note);
  } catch (error) {
    console.error('Error in POST /api/students/:id/notes:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    const result = await Student.delete(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Error in DELETE /api/students/:id:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;