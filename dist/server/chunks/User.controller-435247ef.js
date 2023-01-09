import { A as Article, U as User, b as AssetController } from './Asset.controller-c57bd65e.js';
import { P as Permission } from './permissions-bab9c681.js';

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
  },
  async createFromNotionImport(userData) {
    const { name, email, tags, image, studyProgram } = userData;
    const user = await User.create({
      name,
      email,
      permissions: [Permission.SUBMIT_ARTICLES_FOR_REVIEW.id]
    });
    const pb = await AssetController.create({ alt: "lwe", title: "", data: image }, user._id);
    console.log(pb.url);
    user.image = pb.url;
    const result = await user.save();
    return result;
  }
};

export { UserController as U };
//# sourceMappingURL=User.controller-435247ef.js.map
