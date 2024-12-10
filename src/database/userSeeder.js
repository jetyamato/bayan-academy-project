require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User"); // Adjust the path as necessary
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const users = [
  {
    username: "user",
    password: "$2a$12$e2Ni0Up9U5nTCNcpT1epCe9vNCo83m1Baa2p4Cy/OvhRZ7CBPHD3W",
  },
];

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Users seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding users:", error);
    mongoose.connection.close();
  }
};

seedUsers();
