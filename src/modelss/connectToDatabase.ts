import mongoose from 'mongoose';

export default async function connectToDatabase() {
	await mongoose.connect('mongodb://localhost:27017/suuus', { autoIndex: false });
}
