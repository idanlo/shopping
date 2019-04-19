'use strict';
import express from 'express';
import Product, { ProductModel } from '../models/Product';
import logger from '../util/logger';

const router = express.Router();

/**
 * GET /api/products/all
 * Get all products.
 */
router.get('/products/all', async (req, res) => {
    // const model: ProductModel = new Product({
    //     name: 'Nike shoe v4.0',
    //     price: 405
    // });
    // await Product.create(model);
    // await model.save();
    const products = await Product.find();
    res.status(200).json(products);
});

/**
 * GET /api/products/all
 * Get a product with a certain ID.
 */
router.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
});

export default router;
