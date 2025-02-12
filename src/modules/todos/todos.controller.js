const { errorCatch } = require('../../shared/utils');
const Todo = require('./todo.schema.js');
const model = Todo;

const getList = async (req, res) => {
  try {
    const list = await model.find();
    return res.status(200).json(list);
  } catch (e) {
    return errorCatch(e, res);
  }
};
const createOne = async (req, res) => {
  try {
    const {
      todo,
    } = req.body;
    const newOne = new model({
      title: todo.title,
      description: todo.description,
    });
    await newOne.save();
    return res.status(201).json(newOne);
  } catch (e) {
    return errorCatch(e, res);
  }
};
const readOne = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if(!todo){
        return res.status(404).json({
          message: '404 not found',
        });
    }
    return res.status(200).json(todo);
  } catch (e) {
    return errorCatch(e, res);
  }
};
const updateOne = async (req, res) => {
  try {
    const {
      todo,
    } = req.body;

   const updatedOne = await model.findByIdAndUpdate(req.params.id, {
      title: todo.name,
      description: todo.description,
    },{new:true});
    return res.status(201).json(updatedOne);
  } catch (e) {
    return errorCatch(e, res);
  }
};
const deleteOne = async (req, res) => {
  try {
    await model.findByIdAndDelete(req.params.id);
    return res.status(204).end();
  } catch (e) {
    return errorCatch(e, res);
  }
};

module.exports = {
  getList,
  createOne,
  readOne,
  updateOne,
  deleteOne,
};
