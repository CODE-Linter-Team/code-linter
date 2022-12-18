import mongoose from 'mongoose';
import * as uuid from 'uuid';

const articleSchema = new mongoose.Schema({
    // _id: {
    //     type: String, default: function () { return uuid.v4() },
    // },
    scope: String, // "PUBLIC" | "INTERNAL"
    state: [String], // "PUBLISHED" | "DRAFT" | "UNDER_REVIEW" | "REJECTED"

    authorId: String,
    publisherId: String,

    coverImgSrc: String,
    title: String,
    description: String,
    markdownText: String,
    contentTags: [String],
    url: String,

    submittedDate: { type: Date, default: Date.now },
    publishedDate: { type: Date, default: Date.now },
});
const Article = mongoose.model("Article", articleSchema);

export default Article