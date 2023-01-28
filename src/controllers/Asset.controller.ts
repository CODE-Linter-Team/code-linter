import { PUBLIC_SERVICE_URL } from '$env/static/public';
import User from '../modelss/User';
import Asset from '../modelss/Asset';
import dayjs from 'dayjs';
import { maxProfileCacheDays } from '../data/assetSettings';
import UserController from './User.controller';


export interface FileUpload {
    id: string;
    ownerId: string;
    size: number;
    data: File;
    alt: string;
    title: string;
    url: string;
    usage: boolean;
}
export interface Usage {
    isLogo: boolean;
    isProfilePicture: boolean;
    isArticeImage: boolean;
}
const AssetController = {
    async getPaginated(numResults: number, page: number, types: string[]) {

        const results = await Asset.find({
            ...(types.includes("LOGO") ? { "usage.isLogo": true } : {}),
            ...(types.includes("ARTICLE") ? { "usage.isArticleImage": true } : {}),
            "usage.isProfilePicture": false,
        }).skip(page * numResults).limit(numResults)

        return await Promise.all(results.map(AssetController.refineAsset))
    },
    async refineAsset(assetDoc: any): Promise<FileUpload> {

        const { _id, ownerId, size, data, alt, title, usage } = assetDoc;

        const url = PUBLIC_SERVICE_URL + `/api/assets/${_id}.jpeg`;

        const fileUpload: FileUpload = {
            id: _id,
            ownerId,
            size,
            data,
            alt,
            title,
            url,
            usage
        };
        return fileUpload;
    },
    async get(assetId: string) {
        const rawAsset = await Asset.findOne({ _id: assetId });

        const asset = await AssetController.refineAsset(rawAsset);

        return asset;
    },
    async _create(
        {
            title,
            alt,
            data
        }: {
            title: string;
            alt: string;
            data: any;
        },
        ownerId: string,
        {
            isArticleImage,
            isProfilePicture,
            isLogo,
        }: {
            isArticleImage: boolean;
            isProfilePicture: boolean
            isLogo: boolean
        }
    ) {
        const size = {};

        const usage = {
            isArticleImage,
            isProfilePicture,
            isLogo
        }

        const assetData = {
            title,
            alt,
            data,
            ownerId,
            size,
            usage
        };
        const rawAsset = await Asset.create(assetData);

        return rawAsset.toObject();
    },
    async createProfilePicture(email: string, image: string) {

        const profilePictureOfUser = await Asset.findOne({ ownerId: email, "usage.isProfilePicture": true, updatedAt: { $exists: true } });

        if (profilePictureOfUser) {
            const { data, title, alt, usage } = await this.fetchProfileImageData(image)
            //@ts-ignore
            const currentProfilePicutre = Buffer.from(profilePictureOfUser.data)

            if (currentProfilePicutre.compare(data) !== 0) {
                profilePictureOfUser.title = title

                profilePictureOfUser.alt = alt

                profilePictureOfUser.data = data

                await profilePictureOfUser.save()
            }
            return profilePictureOfUser
        } else {
            const { data, title, alt, usage } = await this.fetchProfileImageData(image)

            const rawAsset = await AssetController._create({ title, alt, data }, email, usage);

            const asset = await AssetController.refineAsset({ ...rawAsset });

            await User.findOneAndUpdate({
                email,
            }, {
                image: asset.url,
            })
            return asset;
        }
    },
    async fetchProfileImageData(image: string) {
        const respone = await fetch(image);

        const blobData = await respone.blob();

        const arrayBufferData = await blobData.arrayBuffer();

        const data = Buffer.from(arrayBufferData);

        const title = 'profileImage';

        const alt = 'profileImage';

        const usage = {
            isArticleImage: false,
            isProfilePicture: true,
            isLogo: false
        }

        return {
            data: data,
            title: title,
            alt: alt,
            usage: usage
        }
    },
    async createArticleImage(
        {
            title,
            alt,
            data
        }: {
            title: string;
            alt: string;
            data: any;
        },
        ownerId: string
    ) {
        const usage = {
            isArticleImage: true,
            isProfilePicture: false,
            isLogo: false
        }

        const rawAsset = await AssetController._create({ title, alt, data }, ownerId, usage);


        const asset = await AssetController.refineAsset({ ...rawAsset });

        return asset;
    },
    async createLogo(
        {
            title,
            alt,
            data
        }: {
            title: string;
            alt: string;
            data: any;
        },
        ownerId: string
    ) {
        const usage = {
            isArticleImage: false,
            isProfilePicture: false,
            isLogo: true
        }

        const rawAsset = await AssetController._create({ title, alt, data }, ownerId, usage);

        const asset = await AssetController.refineAsset({ ...rawAsset });

        return asset;
    }
};
export default AssetController;
