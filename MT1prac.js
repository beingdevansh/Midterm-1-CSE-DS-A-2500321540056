const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.text());

let products = [
    {
        productId: 1,
        name: "Laptop",
        price: 55000,
        category: "Electronics"
    },
    {
        productId: 2,
        name: "Shoes",
        price: 2500,
        category: "Fashion"
    }
];

app.get('/data', (req, res) => {
    let output = "";

    products.forEach(p => {
        output += `${p.productId}, ${p.name}, ${p.price}, ${p.category}\n`;
    });

    res.type('text/plain').send(output);
});

app.get('/data/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.productId === id);

    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.type('text/plain').send(
        `${product.productId}, ${product.name}, ${product.price}, ${product.category}`
    );
});

app.post('/data', (req, res) => {
    const [productId, name, price, category] = req.body.split(',');

    const newProduct = {
        productId: Number(productId),
        name: name.trim(),
        price: Number(price),
        category: category.trim()
    };

    products.push(newProduct);

    res.send("Product added successfully");
});

app.put('/data/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.productId === id);

    if (!product) {
        return res.status(404).send("Product not found");
    }

    const [name, price, category] = req.body.split(',');

    product.name = name.trim();
    product.price = Number(price);
    product.category = category.trim();

    res.send("Product updated successfully");
});

app.delete('/data/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(p => p.productId === id);

    if (index === -1) {
        return res.status(404).send("Product not found");
    }

    products.splice(index, 1);

    res.send("Product deleted successfully");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});