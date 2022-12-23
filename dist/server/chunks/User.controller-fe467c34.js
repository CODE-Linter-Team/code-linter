import { A as Article, U as User } from './User-d88de691.js';

const UserController = {
  async getArticleInfo(userId) {
    const articles = await Article.find({ authorId: userId });
    const pendingCount = articles.filter((i) => i.state?.includes("PENDING")).length;
    const publishedCount = articles.filter((i) => i.state?.includes("PUBLISHED")).length;
    const rejectedCount = articles.filter((i) => i.state?.includes("REJECTED")).length;
    return {
      pendingCount,
      publishedCount,
      rejectedCount
    };
  },
  async hasPermissions(userId, requiredPermissions) {
    const user = await User.findOne({ email: userId });
    if (user == null)
      return false;
    if (!requiredPermissions.every((i) => user.permissions.includes(i)))
      return false;
    return true;
  }
};

export { UserController as U };
//# sourceMappingURL=User.controller-fe467c34.js.map
