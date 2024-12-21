const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
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

        // Create users with hashed passwords
        const hashedPassword = await bcrypt.hash("password123", 10);
        const user1 = await User.create({
          username: "john_doe",
          password: hashedPassword,
        });
        const user2 = await User.create({
          username: "jane_doe",
          password: hashedPassword,
        });

        console.log("Users created:", user1.username, user2.username);

        // Create work orders
        const workOrder1 = await WorkOrder.create({
            status: "To Do",
            description: "Fix car engine",
            dueDate: new Date("2024-12-25"),
            carLicensePlate: "ABC1234", 
            carModel: "Toyota Corolla",
            carId: "1",
            tasks: [
            {
                title: "Check engine light",
                employeeName: user1.username,
            },
            {
                title: "Replace spark plugs",
                employeeName: user1.username,
            }
            ],
        });
        const workOrder2 = await WorkOrder.create({
            status: "In Progress",
            description: "Detail car interior",
            dueDate: new Date("2024-12-22"),
            carLicensePlate: "XYZ5678", 
            carModel: "Honda Civic",   
            carId: "2",
            tasks: [
            {
                title: "Vacuum seats",
                employeeName: user2.username,
            },
            {
                title: "Clean dashboard",
                employeeName: user2.username,
            },
            ],
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
