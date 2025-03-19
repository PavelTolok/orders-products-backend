const express = require('express');
const { orders, products } = require('./data');

const router = express.Router();

router.get('/orders', (req, res) => {
  res.json(orders.map((order) => ({
    ...order,
    totalUSD: order.products.reduce((sum, p) => sum + p.price, 0),
    totalEUR: order.products.reduce((sum, p) => sum + p.price * 0.85, 0).toFixed(2),
  })));
});

router.delete('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = orders.findIndex((o) => o.id === id);
  if (index !== -1) {
    orders.splice(index, 1);
    res.json({ message: 'Order deleted' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

router.get('/products', (req, res) => {
  const { type } = req.query;
  let filteredProducts = products;
  if (type) {
    filteredProducts = products.filter((p) => p.type === type);
  }
  res.json(filteredProducts);
});

module.exports = router;

