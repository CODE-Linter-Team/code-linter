import Article from '../modelss/Article';
import User from '../modelss/User';
import UserController from './User.controller';

import { PUBLIC_SERVICE_URL } from '$env/static/public';

interface CreateArticleBody {
	scope: 'PUBLIC' | 'INTERNAL';

	authorId: string;

	coverImgSrc: string;
	title: string;
	description: string;
	markdownText: string;
	contentTags: string[];
}
const ArticleController = {
	async get(options: {
		includeInternal: boolean;
		contentTags: string[] | undefined;
		authors: string[] | undefined;
		states: string[] | undefined;
	}) {
		const isInvalidArrayOption = (option: string[] | undefined) =>
			(option?.join('').length ?? 0) === 0;

		const articleDocs = await Article.find({
			...(isInvalidArrayOption(options.contentTags)
				? {}
				: { contentTags: { $in: options.contentTags } }),
			...(isInvalidArrayOption(options.authors) ? {} : { authorId: { $in: options.authors } }),
			...(isInvalidArrayOption(options.states) ? {} : { state: { $in: options.states } }),
			...(options.includeInternal ? {} : { scope: 'PUBLIC' })
		});
		const articles = await Promise.all(articleDocs.map(ArticleController.refineArticle));

		return articles;
	},
	async read(_id: string, includeInternal: boolean, fingerPrint: string) {
		// TODO: handle read
		// await Article.updateOne({$where: { id: _id }}, { $inc: viewCount })

		const article = await Article.findOne(
			includeInternal ? { _id, state: 'PUBLISHED' } : { _id, state: 'PUBLISHED', scope: 'PUBLIC' }
		);

		return await ArticleController.refineArticle(article);
	},

	async submitArticleForReview(articleBody: CreateArticleBody) {
		const fullArticleBody = {
			...articleBody,
			state: ['PENDING'],
			submittedDate: Date.now(),
			publisherId: null,
			publishedDate: null
		};
		const article = new Article(fullArticleBody);

		article.url = PUBLIC_SERVICE_URL + '/articles/' + article._id;

		await article.save();
	},
	async publishArticle(articleId: string, publisherId: string) {
		await Article.updateOne(
			{ _id: articleId },
			{
				publishedDate: Date.now(),
				publisherId,
				state: ['PUBLISHED']
			}
		);
	},
	async rejectArticle(articleId: string, publisherId: string) {
		await Article.updateOne(
			{ _id: articleId },
			{
				state: ['REJECTED']
			}
		);
	},
	async refineArticle(rawArticle: any) {
		if (rawArticle == null) return null;

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
	async resolveAuthor(article: any) {
		const authorDoc = await User.findOne({ email: article.authorId });

		if (authorDoc == null) return null;

		const articleInfo = await UserController.getArticleInfo(authorDoc.email!);

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
export default ArticleController;
