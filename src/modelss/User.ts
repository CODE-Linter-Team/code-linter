import mongoose from 'mongoose';
import * as uuid from 'uuid';

const userSchema = new mongoose.Schema({
	// _id: {
	//     type: String, default: function () { return uuid.v4() },
	// },
	// publishedArticles?
	permissions: [String], // "PUBLISH_ARTICLES" | "SUGGEST_ARTICLES"
	name: String,
	email: String,
	image: String
});
const User = mongoose.model('User', userSchema);

export default User;
