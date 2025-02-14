const { errorCatch } = require('../../shared/utils');
const Feature = require('./feature.schema.js');
const {FeaturesTypeEnum, FeaturesStatusEnum} = require("../../shared/enums");
const model = Feature;

const getList = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';
    const startIndex = (page - 1) * limit;
    let total = [{ total: 0 }];
    const filter= {};
    const data = await model.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'features',
          localField: 'parentFeature',
          foreignField: '_id',
          as: 'parentFeature',
        },
      },
      { $unwind: { path: '$parentFeature', preserveNullAndEmptyArrays: true } },
      {
        $match: {
          $or: [
            { code: { $regex: search, $options: 'i' } },
            { title: { $regex: search, $options: 'i' } },
          ],
        },
      },
      {
        $sort: {createdAt: -1},
      },
      {
        $skip: startIndex,
      },
      {
        $limit: limit,
      },
    ]);
    if (data.length > 0) {
      total = await model.aggregate([
        {
          $match: filter,
        },
        {
          $lookup: {
            from: 'features',
            localField: 'parentFeature',
            foreignField: '_id',
            as: 'parentFeature',
          },
        },
        { $unwind: { path: '$parentFeature', preserveNullAndEmptyArrays: true } },
        {
          $match: {
            $or: [
              { code: { $regex: search, $options: 'i' } },
              { title: { $regex: search, $options: 'i' } },
            ],
          },
        },
        {
          $count: 'total',
        },
      ]);
    }
    return res.status(200).json({ data, total: total[0].total });
  } catch (e) {
    return errorCatch(e, res);
  }
};
const createOne = async (req, res) => {
  try {
    const {
      feature,
    } = req.body;
    const newOne = new model({
      code: feature.code,
      title: feature.title,
      type: feature.type,
      subtitle: feature.subtitle | null,
      icon: feature.icon | null,
      link: feature.link | null,
      order: feature.order | null,
      status: feature.status,
      parentFeature: feature.parentFeature ? feature.parentFeature._id : null,
    });
    await newOne.save();
    return res.status(201).json(newOne);
  } catch (e) {
    return errorCatch(e, res);
  }
};
const readOne = async (req, res) => {
  try {
    const document = await model.findById(req.params.id).populate('parentFeature');
    if(!document){
        return res.status(404).json({
          message: '404 not found',
        });
    }
    return res.status(200).json(document);
  } catch (e) {
    return errorCatch(e, res);
  }
};
const updateOne = async (req, res) => {
  try {
    const {
      feature,
    } = req.body;

   const updatedOne = await model.findByIdAndUpdate(req.params.id, {
     code: feature.code,
     title: feature.title,
     type: feature.type,
     subtitle: feature.subtitle | null,
     icon: feature.icon | null,
     link: feature.link | null,
     order: feature.order | null,
     status: feature.status,
     parentFeature: feature.parentFeature ? feature.parentFeature._id : null,
    },{ new: true });
    return res.status(201).json(updatedOne);
  } catch (e) {
    return errorCatch(e, res);
  }
};
const deleteOne = async (req, res) => {
  try {
   const document = await model.findByIdAndDelete(req.params.id);
    if(!document){
      return res.status(404).json({
        message: '404 not found',
      });
    }
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
