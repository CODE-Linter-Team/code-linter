import mongoose from 'mongoose';

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

export { Article as A, User as U };
//# sourceMappingURL=User-d88de691.js.map
