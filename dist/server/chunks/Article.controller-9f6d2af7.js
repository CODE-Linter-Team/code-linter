import { A as Article, U as User } from './User-d88de691.js';
import { U as UserController } from './User.controller-fe467c34.js';
import { P as PUBLIC_SERVICE_URL } from './public-4ac8c09d.js';

const ArticleController = {
  async get(options) {
    const isInvalidArrayOption = (option) => (option?.join("").length ?? 0) === 0;
    const articleDocs = await Article.find({
      ...isInvalidArrayOption(options.contentTags) ? {} : { contentTags: { $in: options.contentTags } },
      ...isInvalidArrayOption(options.authors) ? {} : { authorId: { $in: options.authors } },
      ...isInvalidArrayOption(options.states) ? {} : { state: { $in: options.states } },
      ...options.includeInternal ? {} : { scope: "PUBLIC" }
    });
    const articles = await Promise.all(articleDocs.map(ArticleController.refineArticle));
    return articles;
  },
  async read(_id, includeInternal, fingerPrint) {
    const article = await Article.findOne(includeInternal ? { _id, state: "PUBLISHED" } : { _id, state: "PUBLISHED", scope: "PUBLIC" });
    return await ArticleController.refineArticle(article);
  },
  async submitArticleForReview(articleBody) {
    const fullArticleBody = {
      ...articleBody,
      state: ["PENDING"],
      submittedDate: Date.now(),
      publisherId: null,
      publishedDate: null
    };
    const article = new Article(fullArticleBody);
    article.url = PUBLIC_SERVICE_URL + "/articles/" + article._id;
    await article.save();
  },
  async publishArticle(articleId, publisherId) {
    await Article.updateOne(
      { _id: articleId },
      {
        publishedDate: Date.now(),
        publisherId,
        state: ["PUBLISHED"]
      }
    );
  },
  async rejectArticle(articleId, publisherId) {
    await Article.updateOne(
      { _id: articleId },
      {
        state: ["REJECTED"]
      }
    );
  },
  async refineArticle(rawArticle) {
    if (rawArticle == null)
      return null;
    const {
      _id,
      scope,
      state,
      coverImgSrc,
      title,
      description,
      markdownText,
      contentTags,
      submittedDate,
      publishedDate,
      url
    } = rawArticle;
    const author = await ArticleController.resolveAuthor(rawArticle);
    const article = {
      id: _id,
      scope,
      state,
      coverImgSrc,
      title,
      description,
      markdownText,
      contentTags,
      submittedDate,
      publishedDate,
      url,
      author
    };
    return article;
  },
  async resolveAuthor(article) {
    const authorDoc = await User.findOne({ email: article.authorId });
    if (authorDoc == null)
      return null;
    const articleInfo = await UserController.getArticleInfo(authorDoc.email);
    const { name, email, image, permissions } = authorDoc;
    const author = {
      name,
      email,
      image,
      permissions,
      articleInfo
    };
    return author;
  }
};

export { ArticleController as A };
//# sourceMappingURL=Article.controller-9f6d2af7.js.map
