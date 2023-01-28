import mongoose from 'mongoose';
import * as uuid from 'uuid';

const assetSchema = new mongoose.Schema({
	// _id: {
	//     type: String, default: function () { return uuid.v4() },
	// },
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
const Asset = mongoose.model('Asset', assetSchema);

export default Asset;