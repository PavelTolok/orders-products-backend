const orders = [
  {
    id: 1,
    name: "Order #1",
    createdAt: "2025-03-01T10:00:00Z",
    products: [
      {
        id: 1,
        name: "Product A",
        type: "Electronics",
        price: 100,
        warranty: "2026-03-01",
      },
      {
        id: 2,
        name: "Product B",
        type: "Clothing",
        price: 50,
        warranty: "2025-12-01",
      },
    ],
  },
  {
    id: 2,
    name: "Order #2",
    createdAt: "2025-03-02T15:00:00Z",
    products: [
      {
        id: 3,
        name: "Product C",
        type: "Electronics",
        price: 200,
        warranty: "2027-03-01",
      },
    ],
  },
];

const products = orders.flatMap((order) =>
  order.products.map((p) => ({ ...p, orderName: order.name }))
);

module.exports = { orders, products };
