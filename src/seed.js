const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { Car } = require("./models/CarModel");
const { User } = require("./models/UserModel");
const { WorkOrder } = require("./models/WorkOrderModel");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(async () => {
    console.log("Connected to MongoDB Atlas");

    try {
      await Car.deleteMany({});
      await User.deleteMany({});
      await WorkOrder.deleteMany({});

      // Seed Cars
      const car1 = await Car.create({
        carId: "1",
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        vin: "123456789ABCDEFG",
        licensePlate: "ABC123",
        color: "Blue",
        engineType: "V4",
        transmissionType: "Automatic",
        mileage: 30000,
        fuelType: "Gasoline",
        price: 15000,
        condition: "Good",
        seatingCapacity: 5,
        drivetrain: "FWD",
        status: "For Sale",
        location: "Lot A",
        boughtDate: new Date("2023-01-15"),
      });

      const car2 = await Car.create({
        carId: "2",
        make: "Honda",
        model: "Civic",
        year: 2019,
        vin: "987654321HGFEDCBA",
        licensePlate: "XYZ567",
        color: "Red",
        engineType: "V6",
        transmissionType: "Manual",
        mileage: 45000,
        fuelType: "Diesel",
        price: 14000,
        condition: "Fair",
        seatingCapacity: 5,
        drivetrain: "RWD",
        status: "Sold",
        location: "Lot B",
        boughtDate: new Date("2023-03-10"),
        soldDate: new Date("2023-05-15"),
      });

      const car3 = await Car.create({
        carId: "3",
        make: "Ford",
        model: "Focus",
        year: 2021,
        vin: "567890123HIJKLMN",
        licensePlate: "LMN345",
        color: "White",
        engineType: "Electric",
        transmissionType: "Automatic",
        mileage: 12000,
        fuelType: "Electric",
        price: 20000,
        condition: "Excellent",
        seatingCapacity: 5,
        drivetrain: "AWD",
        status: "For Sale",
        location: "Lot C",
        boughtDate: new Date("2023-06-20"),
      });

      console.log("Cars seeded:", car1.make, car2.make, car3.make);

      // Seed Users
      const user1 = await User.create({
        userId: "U001",
        firstName: "John",
        lastName: "Doe",
        jobTitle: "Technician",
        department: "Reconditioning",
        email: "john.doe@example.com",
        phoneNumber: "123-456-7890",
        hireDate: new Date("2020-06-15"),
        salary: 45000,
        dateOfBirth: new Date("1990-01-01"),
        gender: "Male",
        address: "123 Main St, City, State, ZIP",
        employmentStatus: "Active",
        password: "password123",
      });

      const user2 = await User.create({
        userId: "U002",
        firstName: "Jane",
        lastName: "Smith",
        jobTitle: "Supervisor",
        department: "Sales",
        email: "jane.smith@example.com",
        phoneNumber: "987-654-3210",
        hireDate: new Date("2018-09-01"),
        salary: 60000,
        dateOfBirth: new Date("1985-05-15"),
        gender: "Female",
        address: "456 Elm St, City, State, ZIP",
        employmentStatus: "Active",
        password: "password123",
      });

      const user3 = await User.create({
        userId: "U003",
        firstName: "Alice",
        lastName: "Johnson",
        jobTitle: "Sales Associate",
        department: "Sales",
        email: "alice.johnson@example.com",
        phoneNumber: "555-123-4567",
        hireDate: new Date("2021-05-20"),
        salary: 40000,
        dateOfBirth: new Date("1995-04-10"),
        gender: "Female",
        address: "789 Pine St, City, State, ZIP",
        employmentStatus: "Active",
        password: "password123",
      });

      console.log("Users seeded:", user1.firstName, user2.firstName, user3.firstName);

      // Seed Work Orders
      const workOrderData = Array.from({ length: 30 }, (_, i) => ({
        carId: `C${(i % 3) + 1}`,  // Alternate between car1, car2, and car3
        status: i % 2 === 0 ? "To Do" : "In Progress", // Alternate statuses
        description: `Work Order #${i + 1} for Car ${(i % 3) + 1}`,
        dueDate: new Date(2024, 11, 25), // Set a due date for the work orders
        tasks: [
          {
            title: `Task ${i + 1} for car ${(i % 3) + 1}`,
            employeeName: [user1, user2, user3][i % 3].firstName, // Alternate employees
          },
          {
            title: `Task ${i + 2} for car ${(i % 3) + 1}`,
            employeeName: [user1, user2, user3][(i + 1) % 3].firstName, // Alternate employees
          }
        ],
      }));

      const workOrders = await WorkOrder.create(workOrderData);

      console.log(`Successfully seeded ${workOrders.length} work orders`);

      console.log("Data seeded successfully!");
    } catch (err) {
      console.error("Error seeding data:", err);
    } finally {
      mongoose.disconnect();
    }
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
