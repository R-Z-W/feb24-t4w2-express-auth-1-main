const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();  // Make sure this is called before using environment variables

const { User } = require("./models/UserModel");
const { WorkOrder } = require("./models/WorkOrderModel");

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    // Data to seed
    const sampleData = async () => {
      try {
        // Delete existing data
        await User.deleteMany({});
        await WorkOrder.deleteMany({});

        // Create users
        const user1 = await User.create({
          username: "john_doe",
          password: "password123",
        });
        const user2 = await User.create({
          username: "jane_doe",
          password: "password123",
        });

        console.log("Users created:", user1.username, user2.username);

        // Create work orders
        const workOrder1 = await WorkOrder.create({
          status: "To Do",
          employee: user1._id,
          description: "Fix car engine",
          dueDate: new Date("2024-12-25"),
          carLicensePlate: "ABC1234", 
          carModel: "Toyota Corolla",
          carId: "1",
        });
        const workOrder2 = await WorkOrder.create({
          status: "In Progress",
          employee: user2._id,
          description: "Detail car interior",
          dueDate: new Date("2024-12-22"),
          carLicensePlate: "XYZ5678", 
          carModel: "Honda Civic",   
          carId: "2",            
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
