##Closet Maya - E-Commerce Website
Project Overview
Closet Maya is an interactive, dynamic e-commerce website designed to showcase and sell clothing items. The platform allows users to browse products, view detailed product information, add items to a cart, and place orders. It features a modern, animated UI with dynamic scrolling and smooth user interactions.

Features
Product Management: Add, edit, and display products with name, description, price, and image.
Dynamic UI: Smooth animations powered by AOS (Animate On Scroll) for a visually appealing product listing page.
Product Details Page: View individual product details by clicking the "View Details" button on the main page.
Shopping Cart: Users can add products to a cart and proceed to order.
Responsive Design: Fully responsive website, optimized for mobile, tablet, and desktop views.
Backend Integration: Product data is fetched and updated dynamically from the database.
Technology Stack
Frontend
HTML5: Markup language for structuring web pages.
CSS3: Styling for a modern and responsive design.
JavaScript (ES6): Client-side interactivity.
AOS Library: Used for scroll animations.
Fetch API: For making asynchronous HTTP requests to the backend.
Backend
Node.js: JavaScript runtime for backend logic.
Express.js: Web framework for handling routes and API requests.
SQLite: Lightweight relational database for storing product data.
Multer: Middleware for handling file uploads (e.g., product images).
Installation
Prerequisites
Node.js (version 14.x or higher)
SQLite installed locally or via npm package.
Steps to Run the Project
Clone the repository:

bash
Copy code
git clone https://github.com/Mmulobi/closet-maya.git
cd closet-maya
Install dependencies:

bash
Copy code
npm install
Set up the SQLite Database:

Create a new SQLite database called products.db.
In the root of your project, create a database.js file to handle the connection to your SQLite database:
js
Copy code
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./products.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, price REAL, image TEXT)");
});

module.exports = db;
Start the server:

bash
Copy code
npm start
The server will be running on http://localhost:3000.

Access the website: Open your browser and navigate to http://localhost:3000.

Project Structure
bash
Copy code
.
├── public/
│   ├── assets/            # Static assets like images, logos
│   ├── css/               # Stylesheets (styles.css)
│   ├── js/                # Client-side JavaScript (index.js)
│   ├── index.html         # Homepage listing products
│   ├── add-product.html   # Form to add new products
│   ├── product-details.html # Page to display details of individual products
│   ├── cart.html          # Shopping cart page
├── uploads/               # Uploaded product images
├── app.js                 # Express.js server setup
├── database.js            # SQLite database connection
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
API Endpoints
1. GET /api/products
Fetch all products from the database.
Example Response:
json
Copy code
[
  {
    "id": 1,
    "name": "Chiffon Top",
    "description": "Sleek and classy",
    "price": 45.0,
    "image": "chiffon-top.jpg"
  },
  ...
]
2. GET /api/products/
Fetch a single product by its ID.
Example Response:
json
Copy code
{
  "id": 1,
  "name": "Chiffon Top",
  "description": "Sleek and classy",
  "price": 45.0,
  "image": "chiffon-top.jpg"
}
3. POST /api/products
Add a new product.
Example Request:
json
Copy code
{
  "name": "Floral Dress",
  "description": "Elegant summer dress",
  "price": 60.0,
  "image": "floral-dress.jpg"
}
4. PUT /api/products/
Update an existing product by ID.
5. DELETE /api/products/
Delete a product by ID.
Usage
Add New Product:

Navigate to the Add Product page (add-product.html).
Fill in the product details (name, description, price, and image) and submit.
View Product Details:

On the homepage (index.html), click on the "View Details" button to see detailed information about a product.
Shopping Cart:

Users can add products to their cart and proceed to order from the cart page (cart.html).
Contributing
Fork the repository.
Create a new branch (git checkout -b feature/new-feature).
Make your changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature/new-feature).
Open a Pull Request.
License
This project is licensed under the MIT License. See the LICENSE file for more details.