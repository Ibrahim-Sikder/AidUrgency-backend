const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("AidUrgency");
    const collection = db.collection("users");
    const donarCollection = db.collection("donars");
    const donateCollection = db.collection("donations");

    // User Registration
    app.post("/api/v1/register", async (req, res) => {
      console.log(req.body);
      const { name, email, password } = req.body;

      // Check if email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      await collection.insertOne({ name, email, password: hashedPassword });

      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    });

    // User Login
    app.post("/api/v1/login", async (req, res) => {
      console.log(req.body);
      const { email, password } = req.body;

      // Find user by email
      const user = await collection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign({ email: user }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      });

      res.json({
        success: true,
        message: "Login successful",
        token,
        email,
      });
    });

    // donaton related api
    app.get("/api/v1/donations", async (req, res) => {
      const donations = await donateCollection.find().toArray();
      res.send(donations);
    });

    app.get("/api/v1/donations/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await donateCollection.findOne(filter);
      res.send(result);
    });
    app.post("/api/v1/donations", async (req, res) => {
      const service = req.body;
      const result = await donateCollection.insertOne(service);
      res.send(result);
    });
    app.delete("/api/v1/donations/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await donateCollection.deleteOne(filter);
      res.send(result);
    });

    app.put("/api/v1/donations/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const newDonations = req.body;
      console.log(newDonations);
      console.log(newDonations);
      const options = { upsert: true };
      const UpdateDonations = {
        $set: {
          categories: newDonations.categories,
          title: newDonations.title,
          amount: newDonations.amount,
          image: newDonations.image,
          description: newDonations.description,
        },
      };

      const services = await donateCollection.updateOne(
        filter,
        UpdateDonations,
        options
      );
      res.send(services);
    });

    // donar api
    app.post("/api/v1/donars", async (req, res) => {
      const donars = req.body;
      const result = await donarCollection.insertOne(donars);
      res.send(result);
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});
