const mongoose = require('mongoose');
const {FeaturesTypeEnum, FeaturesStatusEnum} = require("../../shared/enums");

const { Schema } = mongoose;

const Feature = new Schema({
  code: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-z0-9]+$/,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9]+$/,
  },
  type: {
    type: String,
    enums: Object.values(FeaturesTypeEnum),
    required: true,
  },
  subtitle: {
    type: String,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9]+$/,
  },
  icon: {
    type: String,
  },
  link: {
    type: String,
    minlength: 3,
    maxlength: 20,
    match:  /^[a-z0-9/-]+$/,
  },
  order: {
    type: Number,
    default: 1,
    min: 1
  },
  status: {
    type: String,
    enums: Object.values(FeaturesStatusEnum),
    required: true,
  },
  parentFeature: {
    type: Schema.Types.ObjectId,
    ref: 'Feature',
  },
}, { timestamps: true });

module.exports = mongoose.model('Feature', Feature);
