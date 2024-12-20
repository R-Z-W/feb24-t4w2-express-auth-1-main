const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();  // Make sure this is called before using environment variables

const { User } = require("./models/UserModel");
const { WorkOrder } = require("./models/WorkOrderModel");

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // Sample data to seed
    const sampleData = async () => {
      try {
        // Clear existing data (optional, if you want to start fresh)
        await User.deleteMany({});
        await WorkOrder.deleteMany({});

        // Create sample users
        const user1 = await User.create({
          username: "john_doe",
          password: "password123",
        });
        const user2 = await User.create({
          username: "jane_doe",
          password: "password123",
        });

        console.log("Users created:", user1.username, user2.username);

        // Create sample work orders with required fields
        const workOrder1 = await WorkOrder.create({
          status: "To Do",
          employee: user1._id,
          description: "Fix car engine",
          dueDate: new Date("2024-12-25"),
          carLicensePlate: "ABC1234",  // Add the car license plate
          carModel: "Toyota Corolla",   // Add the car model
          carId: "1",                   // Add the car ID
        });
        const workOrder2 = await WorkOrder.create({
          status: "In Progress",
          employee: user2._id,
          description: "Detail car interior",
          dueDate: new Date("2024-12-22"),
          carLicensePlate: "XYZ5678",  // Add the car license plate
          carModel: "Honda Civic",      // Add the car model
          carId: "2",                   // Add the car ID
        });

        console.log("Work Orders created:", workOrder1.description, workOrder2.description);

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
