const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up static folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set up database connection
const db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    image TEXT
)`);

// Set up multer for file uploads with image file validation
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only images are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.post('/api/products', upload.single('image'), (req, res) => {
    const { name, description, price } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    db.run(`INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`, [name, description, price, imagePath], function(err) {
        if (err) {
            return res.status(500).send('Error adding product');
        }
        res.redirect('/');
    });
});

app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.json(rows);
    });
});

app.get('/get-product-details', (req, res) => {
    const productId = req.query.id;
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.get(sql, [productId], (err, product) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error fetching product details');
        } else {
            res.json(product);
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
