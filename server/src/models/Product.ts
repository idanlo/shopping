import mongoose, { Model } from 'mongoose';

export type ProductModel = mongoose.Document & {
    name: string;
    price: number;
};

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true }
    },
    { timestamps: true }
);

const Product: Model<ProductModel> = mongoose.model<ProductModel>(
    'Product',
    productSchema
);
// const User = mongoose.model('User', userSchema);
export default Product;
