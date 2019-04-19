'use strict';
import express from 'express';
import Product, { ProductModel } from '../models/Product';
import tags from '../models/Tag';
import logger from '../util/logger';

const router = express.Router();

// a middleware to expose a 'sort' object to all api routes, that way products can be sorted the way the user chooses
router.use((req, res, next) => {
    const { sort } = req.body;
    if (!sort) return next();
    req.body.sort = sort;
    next();
});
/**
 * GET /api/product/all
 * Get all products.
 */
router.get('/product/all', async (req, res) => {
    const products = await Product.find().sort(req.body.sort);
    res.status(200).json(products);
});

/**
 * GET /api/product/tag/
 * Get all products with certain tags.
 * tags is expected to be an array of strings
 */
router.get('/product/tag', async (req, res) => {
    try {
        const { tags }: { tags: string[] } = req.body;
        // get all products with [tags] and sort by price descending
        const products = await Product.find()
            .where('tags')
            .in(tags)
            .sort(req.body.sort);
        res.status(200).json(products);
    } catch {
        // FIXME: better status code
        return res.status(404).json({ message: 'No products found' });
    }
});

/**
 * GET /api/tag/all
 * Get all tags available.
 */
router.get('/tag/all', (req, res) => {
    res.status(200).json({ tags });
});

/**
 * POST /api/product/new
 * Create a new product .
 */
router.post('/product/new', async (req, res) => {
    try {
        const {
            name,
            price,
            tags
        }: { name: string; price: number; tags: string[] } = req.body;

        const product = await Product.create({
            tags: tags,
            name: name,
            price: +price
        });
        return res.status(200).json(product);
    } catch {
        // FIXME: better status code
        return res.status(404).json({
            message: 'Please send fields: name, price and tags'
        });
    }
});

/**
 * GET /api/products/:id
 * Get a product with a certain ID.
 */
router.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        return res.status(200).json(product);
    } catch {
        // FIXME: better status code
        res.status(404);
        if (!req.params.id) {
            return res.json({ message: 'No ID given' });
        }
        return res.json({ message: 'Product not found' });
    }
});

export default router;
