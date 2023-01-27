import { PUBLIC_SERVICE_URL } from "$env/static/public"

import Asset from '../modelss/Asset';

export interface FileUpload {
	id: string
	ownerId: string,
	size: number,
	data: File,
	alt: string,
	title: string,
	url: string,
}
const AssetController = {
	async refineAsset(assetDoc: any): Promise<FileUpload> {
		const { _id, ownerId, size, data, alt, title } = assetDoc;

		const url = PUBLIC_SERVICE_URL + `/api/assets/${_id}.jpeg`;

		const fileUpload: FileUpload = {
			id: _id,
			ownerId,
			size,
			data,
			alt,
			title,
			url
		};
		return fileUpload
	},
	async get(assetId: string) {
		const rawAsset = await Asset.findOne({ _id: assetId });

		const asset = await AssetController.refineAsset(rawAsset);

		return asset;
	},
	async create(
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
		const size = {};

		const assetData = {
			title,
			alt,
			data,
			ownerId,
			size
		};
		const rawAsset = await Asset.create(assetData);

		const asset = await AssetController.refineAsset({ ...rawAsset, _id: rawAsset.id });

		return asset;
	}
};
export default AssetController;
