const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary storage for orders (this will reset when the server restarts)
let orders = [];

// Menu items (static for now)
const menu = [
    { name: "pokora", price: 30, image: "" },
    { name: "chawmin", price: 30, image: "pizza.jpg" },
    { name: "Pasta", price: 30, image: "pasta.jpg" }
];

// Route to get the menu items (for customer to browse)
app.get('/api/menu', (req, res) => {
    res.json(menu);
});

// Route to get all orders for the admin view
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Route to receive a new customer order
app.post('/api/order', (req, res) => {
    const { customerID, items, comment } = req.body;

    // Check if the order has the necessary details
    if (!customerID || !items || items.length === 0) {
        return res.status(400).json({ message: 'Missing required fields: customerID, items' });
    }

    // Validate if all ordered items exist in the menu
    const orderedItems = items.map(item => {
        const menuItem = menu.find(menuItem => menuItem.name === item.name);
        if (menuItem) {
            return { ...menuItem, quantity: item.quantity };
        } else {
            return null;
        }
    }).filter(item => item !== null);

    if (orderedItems.length === 0) {
        return res.status(400).json({ message: 'None of the ordered items are valid from the menu.' });
    }

    const order = {
        customerID,
        items: orderedItems,
        comment,
        time: new Date().toLocaleString() // Record the time of the order
    };

    orders.push(order); // Save the order to the array
    res.status(200).json({ message: 'Order received successfully!' });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
