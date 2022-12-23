import { P as PUBLIC_SERVICE_URL } from './public-4ac8c09d.js';
import mongoose from 'mongoose';

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
    const asset = await AssetController.refineAsset(rawAsset);
    return asset;
  }
};

export { AssetController as A };
//# sourceMappingURL=Asset.controller-80cd85b7.js.map
