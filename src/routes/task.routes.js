const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({title, description});
    await task.save();
    res.json('Task created');
});

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    // const task = new Task({title, description});
    await Task.findByIdAndUpdate(req.params.id, { title, description });
    res.json("Task updated");
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json("Task deleted");
});

module.exports = router;