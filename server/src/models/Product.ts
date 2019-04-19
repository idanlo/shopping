import mongoose, { Model } from 'mongoose';
import { IProduct } from '../../../shared';

export type ProductModel = mongoose.Document & IProduct;

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
