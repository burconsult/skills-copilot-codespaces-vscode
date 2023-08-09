// Create web server application with Node.js
// npm install express
// npm install body-parser
// npm install morgan
// npm install nodemon
// npm install cors
// npm install mongoose
// npm install bcrypt
// npm install jsonwebtoken
// npm install dotenv
// npm install multer
// npm install uuid
// npm install express-rate-limit

// 1. Import libraries
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// 1.1 Import mongoose
const mongoose = require('mongoose');

// 1.2 Import the model
const Comment = require('./models/comment');

// 1.3 Import the JWT library
const jwt = require('jsonwebtoken');

// 1.4 Import the bcrypt library
const bcrypt = require('bcrypt');

// 1.5 Import the .env library
require('dotenv').config();

// 1.6 Import the multer library
const multer = require('multer');

// 1.7 Import the uuid library
const { v4: uuidv4 } = require('uuid');

// 1.8 Import the express-rate-limit library
const rateLimit = require('express-rate-limit');

// 2. Setup environment
const app = express();
const PORT = process.env.PORT || 3000;

// 2.1 Setup cors
app.use(cors());

// 2.2 Setup morgan
app.use(morgan('tiny'));

// 2.3 Setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 2.4 Setup static files
app.use('/public', express.static(__dirname + '/public'));

// 2.5 Setup multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, uuidv4() + '-' + originalname);
    }
});
const upload = multer({ storage: storage });

// 2.6 Setup rate limit
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// 3. Connect to MongoDB
// 3




