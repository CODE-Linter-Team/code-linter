import Asset from "../modelss/Asset"

const AssetController = {
    async refineAsset(assetDoc: any) {

        const {
            _id,
            ownerId,
            size,
            data,
            alt,
            title
        } = assetDoc

        const url = `http://localhost:5173/api/assets/${_id}.jpeg`

        return {
            id: _id,
            ownerId,
            size,
            data,
            alt,
            title,
            url
        }
    },
    async get(assetId: string) {

        const rawAsset = await Asset.findOne({ _id: assetId })

        const asset = await AssetController.refineAsset(rawAsset)

        return asset
    },
    async create({
        title,
        alt,
        data
    }: {
        title: string,
        alt: string,
        data: any
    }, ownerId: string) {

        const size = {}

        const assetData = {
            title,
            alt,
            data,
            ownerId,
            size,
        }
        const rawAsset = await Asset.create(assetData)

        const asset = await AssetController.refineAsset(rawAsset)

        return asset
    }
}
export default AssetController