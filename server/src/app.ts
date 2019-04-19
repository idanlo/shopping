import express from 'express';
import compression from 'compression'; // compresses requests
import session from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongo from 'connect-mongo';
import path from 'path';
import mongoose from 'mongoose';
import bluebird, { resolve } from 'bluebird';
import { MONGODB_URI, SESSION_SECRET, ENVIRONMENT } from './util/secrets';

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

// Controllers (route handlers)
import api from './controllers/api';

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose
    .connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch(err => {
        console.log(
            'MongoDB connection error. Please make sure MongoDB is running. ' +
                err
        );
        // process.exit();
    });

// Express configuration
app.set('port', process.env.PORT || 8000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
            url: mongoUrl,
            autoReconnect: true
        })
    })
);

app.use(express.static(path.join(__dirname, '../../web/build')));

/**
 * Primary app routes.
 */
app.use('/api', api);
app.get('*', (_, res) => {
    res.sendfile(path.join(__dirname, '../../web/build/index.html'));
});

export default app;
