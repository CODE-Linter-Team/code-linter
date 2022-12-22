import Article from '../modelss/Article';
import User from '../modelss/User';

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
	}
};
export default UserController;
