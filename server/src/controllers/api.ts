'use strict';
import express from 'express';
import Product, { ProductModel } from '../models/Product';
import categories from '../models/Category';
import logger from '../util/logger';

const router = express.Router();

/**
 * SORT MIDDLEWARE
 * a middleware to expose a 'sort' object to all api routes, that way products can be sorted the way the user chooses
 */
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
    // get all products and sort by req.body.sort (with the sort middleware)
    const products = await Product.find().sort(req.body.sort);
    // .limit(10);
    res.status(200).json(products);
});

/**
 * GET /api/product/category
 * Get all products with certain categories.
 * req.body.categories is expected to be an array of strings
 */
router.get('/product/category/:categories', async (req, res) => {
    try {
        // get the categories string from the request params
        const { categories }: { categories: string } = req.params;
        // the categories are supposed to be a string of categories separated with commas
        const categoryArr = categories.split(',');
        // get all products with [categories] and sort by req.body.sort (with the sort middleware)
        // using where().all() doesn't work because the typings are not correct.
        const products = await Product.find({
            categories: { $all: categoryArr }
        }).sort(req.body.sort);
        res.status(200).json(products);
    } catch {
        // FIXME: better status code
        return res.status(404).json({ message: 'No products found' });
    }
});

/**
 * GET /api/category/all
 * Get all categories available.
 */
router.get('/category/all', (req, res) => {
    res.status(200).json({ categories });
});

/**
 * POST /api/product/new
 * Create a new product .
 */
router.post('/product/new', async (req, res) => {
    try {
        // get all data for creating a product from the request body
        const {
            name,
            price,
            images,
            categories
        }: {
            name: string;
            price: number;
            categories: string[];
            images: string[];
        } = req.body;

        const product = await Product.create({
            categories,
            name,
            images,
            price: +price
        });
        return res.status(200).json(product);
    } catch {
        // FIXME: better status code
        return res.status(404).json({
            message: 'Please send fields: name, price, images and categories'
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
