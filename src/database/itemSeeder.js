const mongoose = require("mongoose");
const Item = require("../models/Item"); // Adjust the path as necessary
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const items = [
  {
    name: "Smartphone",
    description:
      "A high-end smartphone with a large display and powerful processor",
    category: "Electronics",
    quantity: 50,
    price: 699.99,
  },
  {
    name: "Laptop",
    description:
      "A lightweight laptop with a long battery life and high-resolution screen",
    category: "Electronics",
    quantity: 30,
    price: 999.99,
  },
  {
    name: "Headphones",
    description:
      "Noise-cancelling over-ear headphones with high-fidelity sound",
    category: "Electronics",
    quantity: 100,
    price: 199.99,
  },
  {
    name: "Smartwatch",
    description: "A smartwatch with fitness tracking and notification features",
    category: "Electronics",
    quantity: 75,
    price: 249.99,
  },
  {
    name: "Tablet",
    description:
      "A tablet with a high-resolution display and powerful processor",
    category: "Electronics",
    quantity: 40,
    price: 499.99,
  },
  {
    name: "Bluetooth Speaker",
    description: "A portable Bluetooth speaker with excellent sound quality",
    category: "Electronics",
    quantity: 60,
    price: 149.99,
  },
  {
    name: "Gaming Console",
    description:
      "A next-gen gaming console with stunning graphics and fast performance",
    category: "Electronics",
    quantity: 20,
    price: 499.99,
  },
  {
    name: "Digital Camera",
    description:
      "A digital camera with high resolution and multiple shooting modes",
    category: "Electronics",
    quantity: 25,
    price: 799.99,
  },
  {
    name: "Wireless Mouse",
    description: "A wireless mouse with ergonomic design and long battery life",
    category: "Electronics",
    quantity: 150,
    price: 29.99,
  },
  {
    name: "External Hard Drive",
    description: "A portable external hard drive with 2TB storage capacity",
    category: "Electronics",
    quantity: 80,
    price: 89.99,
  },
];

const seedItems = async () => {
  try {
    await Item.deleteMany({});
    await Item.insertMany(items);
    console.log("Items seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding items:", error);
    mongoose.connection.close();
  }
};

seedItems();
