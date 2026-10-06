# E-Shop — Full-Stack E-Commerce Website

A full-stack e-commerce web application built using React, Node.js, Express.js, and MongoDB.

## Features

* Browse products and view product details
* Search products and filter by category
* Add products to cart
* Update quantities and remove cart items
* Persist cart data using localStorage
* Checkout and place orders
* Store orders in MongoDB
* Validate product availability and stock during checkout
* Responsive user interface

## Tech Stack

**Frontend:** React, Vite, React Router, CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas, Mongoose
**Tools:** Git, GitHub, npm

## Project Structure

* `frontend/` — React application
* `backend/` — Express API, models, controllers, and routes

## Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd E-Commerce
```

### 2. Start the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend using the start script configured in `backend/package.json`.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite in your browser.

## Security

* Keep database credentials in environment variables.
* Never commit `.env` files or secrets to GitHub.
* Configure environment variables separately when deploying.

## Future Improvements

* User authentication
* Order history
* Admin product management
* Payment gateway integration

## Author

Jahanvi Gupta
