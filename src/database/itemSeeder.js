require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("../models/Item"); // Adjust the path as necessary
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const items = [
  {
    name: "Smartphone",
    image: "/img/smartphone.png",
    description:
      "A high-end smartphone with a large display and powerful processor",
    quantity: 50,
    price: 699.99,
  },
  {
    name: "Laptop",
    image: "/img/laptop.png",
    description:
      "A lightweight laptop with a long battery life and high-resolution screen",
    quantity: 30,
    price: 999.99,
  },
  {
    name: "Headphones",
    image: "/img/headphones.png",
    description:
      "Noise-cancelling over-ear headphones with high-fidelity sound",
    quantity: 100,
    price: 199.99,
  },
  {
    name: "Smartwatch",
    image: "/img/smartwatch.png",
    description: "A smartwatch with fitness tracking and notification features",
    quantity: 75,
    price: 249.99,
  },
  {
    name: "Tablet",
    image: "/img/tablet.png",
    description:
      "A tablet with a high-resolution display and powerful processor",
    quantity: 40,
    price: 499.99,
  },
  {
    name: "Bluetooth Speaker",
    image: "/img/speaker.png",
    description: "A portable Bluetooth speaker with excellent sound quality",
    quantity: 60,
    price: 149.99,
  },
  {
    name: "Gaming Console",
    image: "/img/console.png",
    description:
      "A next-gen gaming console with stunning graphics and fast performance",
    quantity: 20,
    price: 499.99,
  },
  {
    name: "Digital Camera",
    image: "/img/camera.png",
    description:
      "A digital camera with high resolution and multiple shooting modes",
    quantity: 25,
    price: 799.99,
  },
  {
    name: "Wireless Mouse",
    image: "/img/mouse.png",
    description: "A wireless mouse with ergonomic design and long battery life",
    quantity: 150,
    price: 29.99,
  },
  {
    name: "External Hard Drive",
    image: "/img/external.png",
    description: "A portable external hard drive with 2TB storage capacity",
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
