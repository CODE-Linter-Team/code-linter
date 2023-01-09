import mongoose from 'mongoose';
import { P as PUBLIC_SERVICE_URL } from './public-4ac8c09d.js';

const articleSchema = new mongoose.Schema({
  scope: String,
  state: [String],
  authorId: String,
  publisherId: String,
  coverImgSrc: String,
  title: String,
  description: String,
  markdownText: String,
  contentTags: [String],
  url: String,
  submittedDate: { type: Date, default: Date.now },
  publishedDate: { type: Date, default: Date.now }
});
const Article = mongoose.model("Article", articleSchema);
const userSchema = new mongoose.Schema({
  permissions: [String],
  name: String,
  email: String,
  image: String
});
const User = mongoose.model("User", userSchema);
const assetSchema = new mongoose.Schema({
  size: {
    widthPx: Number,
    heightPx: Number,
    sizeBytes: Number
  },
  ownerId: String,
  title: String,
  alt: String,
  data: Buffer
});
const Asset = mongoose.model("Asset", assetSchema);
const AssetController = {
  async refineAsset(assetDoc) {
    const { _id, ownerId, size, data, alt, title } = assetDoc;
    const url = PUBLIC_SERVICE_URL + `/api/assets/${_id}.jpeg`;
    return {
      id: _id,
      ownerId,
      size,
      data,
      alt,
      title,
      url
    };
  },
  async get(assetId) {
    const rawAsset = await Asset.findOne({ _id: assetId });
    const asset = await AssetController.refineAsset(rawAsset);
    return asset;
  },
  async create({
    title,
    alt,
    data
  }, ownerId) {
    const size = {};
    const assetData = {
      title,
      alt,
      data,
      ownerId,
      size
    };
    const rawAsset = await Asset.create(assetData);
    const asset = await AssetController.refineAsset({ ...rawAsset, _id: rawAsset.id });
    return asset;
  }
};

export { Article as A, User as U, Asset as a, AssetController as b };
//# sourceMappingURL=Asset.controller-c57bd65e.js.map
