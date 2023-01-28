import Article from '../modelss/Article';
import User from '../modelss/User';
import AssetController from '../controllers/Asset.controller';
import Permission from '../data/permissions';

const UserController = {
	async getArticleInfo(userId: string) {
		const articles = await Article.find({ authorId: userId });

		const pendingCount = articles.filter((i) => i.state?.includes('PENDING')).length;
		const publishedCount = articles.filter((i) => i.state?.includes('PUBLISHED')).length;
		const rejectedCount = articles.filter((i) => i.state?.includes('REJECTED')).length;

		return {
			pendingCount,
			publishedCount,
			rejectedCount
		};
	},
	async hasPermissions(userId: string, requiredPermissions: string[]) {
		const user = await User.findOne({ email: userId });

		if (user == null) return false;

		if (!requiredPermissions.every((i) => user.permissions.includes(i))) return false;

		return true;
	},
	async createFromNotionImport(userData: any) {
		const { name, email, tags, image, studyProgram } = userData;

		const user = await User.create({
			name,
			email,
			permissions: [Permission.SUBMIT_ARTICLES_FOR_REVIEW.id]
		});
		const pb = await AssetController._create({ alt: 'lwe', title: '', data: image }, user._id, { isArticleImage: false, isProfilePicture: false, isLogo: false });

		console.log(user.name, pb.url, image == null)

		user.image = pb.url;

		const result = await user.save();

		return result;
	}
};
export default UserController;
