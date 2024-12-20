// seed.js
const mongoose = require("mongoose");
const { User } = require("./models/UserModel");
const { WorkOrder } = require("./models/WorkOrderModel"); // Assuming you have a WorkOrder model
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // Sample data to seed
    const sampleData = async () => {
      try {
        // Create sample users
        const user1 = await User.create({
          username: "john_doe",
          password: "password123",
        });
        const user2 = await User.create({
          username: "jane_doe",
          password: "password123",
        });

        // Create sample work orders
        const workOrder1 = await WorkOrder.create({
          status: "To Do",
          employee: user1._id,
          description: "Fix car engine",
          dueDate: new Date("2024-12-25"),
        });
        const workOrder2 = await WorkOrder.create({
          status: "In Progress",
          employee: user2._id,
          description: "Detail car interior",
          dueDate: new Date("2024-12-22"),
        });

        console.log("Data seeded successfully!");
      } catch (err) {
        console.error("Error seeding data:", err);
      } finally {
        mongoose.disconnect();
      }
    };

    sampleData();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
