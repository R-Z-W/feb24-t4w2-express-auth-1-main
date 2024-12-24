const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { User } = require("./models/UserModel");
const { WorkOrder } = require("./models/WorkOrderModel");
const { Car } = require("./models/CarModel");

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
      const users = await User.create([
        {
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
          username: "johndoe",
        },
        {
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
          username: "janesmith",
        },
        {
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
          username: "alicejohnson",
        },
      ]);

      console.log("Users seeded:", users.map((user) => user.firstName).join(", "));

      // Seed Work Orders
      const workOrders = await WorkOrder.create([
        {
          carId: car1._id,
          userId: users[0]._id, // Add userId from created user
          serviceType: "Oil Change",
          startDate: new Date("2024-01-05"),
          completionDate: new Date("2024-01-06"),
          technicianAssigned: users[0].firstName,
          status: "Pending",
          tasks: [
            { title: "Drain old oil", description: "Drained oil using vacuum pump." },
            { title: "Replace oil filter", description: "Using OEM filter." },
          ],
          laborHours: 2,
          costOfService: 150,
        },
        {
          carId: car2._id,
          userId: users[1]._id,
          serviceType: "Brake Inspection",
          startDate: new Date("2024-01-07"),
          completionDate: null,
          technicianAssigned: users[1].firstName,
          status: "In Progress",
          tasks: [
            { title: "Inspect brake pads" },
            { title: "Test brake fluid levels" },
          ],
          laborHours: 1.5,
          costOfService: 75,
        },
        {
          carId: car3._id,
          userId: users[2]._id,
          serviceType: "Tire Replacement",
          startDate: new Date("2024-01-10"),
          completionDate: new Date("2024-01-11"),
          technicianAssigned: users[2].firstName,
          status: "Complete",
          tasks: [
            { title: "Remove old tires" },
            { title: "Install new tires" },
          ],
          laborHours: 3,
          costOfService: 400,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Battery Replacement",
          startDate: new Date("2024-01-12"),
          completionDate: null,
          technicianAssigned: users[0].firstName,
          status: "In Progress",
          tasks: [
            { title: "Test old battery" },
            { title: "Install new battery" },
          ],
          laborHours: 1,
          costOfService: 120,
        },
        {
          carId: car2._id,
          userId: users[1]._id,
          serviceType: "Transmission Check",
          startDate: new Date("2024-01-15"),
          completionDate: null,
          technicianAssigned: users[1].firstName,
          status: "Pending",
          tasks: [
            { title: "Inspect transmission fluid" },
            { title: "Run diagnostics" },
          ],
          laborHours: 4,
          costOfService: 300,
        },
        {
          carId: car3._id,
          userId: users[2]._id,
          serviceType: "AC Repair",
          startDate: new Date("2024-01-20"),
          completionDate: new Date("2024-01-21"),
          technicianAssigned: users[2].firstName,
          status: "Complete",
          tasks: [
            { title: "Replace AC compressor" },
            { title: "Recharge refrigerant" },
          ],
          laborHours: 5,
          costOfService: 450,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Coolant Flush",
          startDate: new Date("2024-01-22"),
          completionDate: null,
          technicianAssigned: users[0].firstName,
          status: "In Progress",
          tasks: [
            { title: "Drain old coolant" },
            { title: "Fill with new coolant" },
          ],
          laborHours: 2,
          costOfService: 100,
        },
        {
          carId: car2._id,
          userId: users[1]._id,
          serviceType: "Wheel Alignment",
          startDate: new Date("2024-01-25"),
          completionDate: null,
          technicianAssigned: users[1].firstName,
          status: "In Progress",
          tasks: [
            { title: "Adjust camber angles" },
            { title: "Test alignment" },
          ],
          laborHours: 2,
          costOfService: 200,
        },
        {
          carId: car3._id,
          userId: users[2]._id,
          serviceType: "Spark Plug Replacement",
          startDate: new Date("2024-01-27"),
          completionDate: new Date("2024-01-28"),
          technicianAssigned: users[2].firstName,
          status: "Complete",
          tasks: [
            { title: "Remove old spark plugs" },
            { title: "Install new spark plugs" },
          ],
          laborHours: 1,
          costOfService: 80,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Suspension Check",
          startDate: new Date("2024-01-30"),
          completionDate: new Date("2024-02-01"),
          technicianAssigned: users[0].firstName,
          status: "Pending",
          tasks: [
            { title: "Inspect shock absorbers" },
            { title: "Test suspension system" },
          ],
          laborHours: 3,
          costOfService: 250,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Exhaust System Repair",
          startDate: new Date("2024-02-02"),
          completionDate: new Date("2024-02-03"),
          technicianAssigned: users[0].firstName,
          status: "Complete",
          tasks: [
            { title: "Inspect exhaust pipes" },
            { title: "Replace damaged muffler" },
          ],
          laborHours: 4,
          costOfService: 350,
        },
        {
          carId: car2._id,
          userId: users[1]._id,
          serviceType: "Fuel Injector Cleaning",
          startDate: new Date("2024-02-05"),
          completionDate: new Date("2024-02-06"),
          technicianAssigned: users[1].firstName,
          status: "Complete",
          tasks: [
            { title: "Clean fuel injectors" },
            { title: "Check fuel pressure" },
          ],
          laborHours: 3,
          costOfService: 180,
        },
        {
          carId: car3._id,
          userId: users[2]._id,
          serviceType: "Timing Belt Replacement",
          startDate: new Date("2024-02-08"),
          completionDate: new Date("2024-02-09"),
          technicianAssigned: users[2].firstName,
          status: "Complete",
          tasks: [
            { title: "Remove old timing belt" },
            { title: "Install new timing belt" },
          ],
          laborHours: 5,
          costOfService: 500,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Power Steering Fluid Flush",
          startDate: new Date("2024-02-10"),
          completionDate: new Date("2024-02-11"),
          technicianAssigned: users[0].firstName,
          status: "Pending",
          tasks: [
            { title: "Drain old fluid" },
            { title: "Refill with new fluid" },
          ],
          laborHours: 2,
          costOfService: 120,
        },
        {
          carId: car2._id,
          userId: users[1]._id,
          serviceType: "Windshield Wiper Replacement",
          startDate: new Date("2024-02-12"),
          completionDate: new Date("2024-02-13"),
          technicianAssigned: users[1].firstName,
          status: "Pending",
          tasks: [
            { title: "Remove old wiper blades" },
            { title: "Install new wiper blades" },
          ],
          laborHours: 1,
          costOfService: 30,
        },
        {
          carId: car3._id,
          userId: users[2]._id,
          serviceType: "Alternator Replacement",
          startDate: new Date("2024-02-14"),
          completionDate: new Date("2024-02-15"),
          technicianAssigned: users[2].firstName,
          status: "Pending",
          tasks: [
            { title: "Remove old alternator" },
            { title: "Install new alternator" },
          ],
          laborHours: 4,
          costOfService: 350,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Brake Fluid Flush",
          startDate: new Date("2024-02-17"),
          completionDate: new Date("2024-02-18"),
          technicianAssigned: users[0].firstName,
          status: "Complete",
          tasks: [
            { title: "Drain brake fluid" },
            { title: "Refill with new brake fluid" },
          ],
          laborHours: 2,
          costOfService: 100,
        },
        {
          carId: car2._id,
          userId: users[1]._id,
          serviceType: "Timing Chain Replacement",
          startDate: new Date("2024-02-20"),
          completionDate: new Date("2024-02-21"),
          technicianAssigned: users[1].firstName,
          status: "Complete",
          tasks: [
            { title: "Remove timing chain" },
            { title: "Install new timing chain" },
          ],
          laborHours: 6,
          costOfService: 550,
        },
        {
          carId: car3._id,
          userId: users[2]._id,
          serviceType: "Differential Fluid Change",
          startDate: new Date("2024-02-23"),
          completionDate: new Date("2024-02-24"),
          technicianAssigned: users[2].firstName,
          status: "Complete",
          tasks: [
            { title: "Drain old differential fluid" },
            { title: "Refill with new fluid" },
          ],
          laborHours: 3,
          costOfService: 180,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Timing Belt Tensioner Replacement",
          startDate: new Date("2024-02-25"),
          completionDate: new Date("2024-02-26"),
          technicianAssigned: users[0].firstName,
          status: "Complete",
          tasks: [
            { title: "Remove old tensioner" },
            { title: "Install new tensioner" },
          ],
          laborHours: 4,
          costOfService: 400,
        },
        {
          carId: car2._id,
          userId: users[1]._id,
          serviceType: "Clutch Replacement",
          startDate: new Date("2024-02-28"),
          completionDate: new Date("2024-02-29"),
          technicianAssigned: users[1].firstName,
          status: "Pending",
          tasks: [
            { title: "Remove old clutch" },
            { title: "Install new clutch" },
          ],
          laborHours: 7,
          costOfService: 600,
        },
        {
          carId: car3._id,
          userId: users[2]._id,
          serviceType: "Turbocharger Replacement",
          startDate: new Date("2024-03-01"),
          completionDate: new Date("2024-03-02"),
          technicianAssigned: users[2].firstName,
          status: "Pending",
          tasks: [
            { title: "Remove old turbocharger" },
            { title: "Install new turbocharger" },
          ],
          laborHours: 8,
          costOfService: 1200,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Wheel Bearing Replacement",
          startDate: new Date("2024-03-05"),
          completionDate: new Date("2024-03-06"),
          technicianAssigned: users[0].firstName,
          status: "Pending",
          tasks: [
            { title: "Remove old wheel bearings" },
            { title: "Install new wheel bearings" },
          ],
          laborHours: 5,
          costOfService: 350,
        },
        {
          carId: car2._id,
          userId: users[1]._id,
          serviceType: "Fuel Pump Replacement",
          startDate: new Date("2024-03-08"),
          completionDate: new Date("2024-03-09"),
          technicianAssigned: users[1].firstName,
          status: "Complete",
          tasks: [
            { title: "Remove old fuel pump" },
            { title: "Install new fuel pump" },
          ],
          laborHours: 4,
          costOfService: 300,
        },
        {
          carId: car3._id,
          userId: users[2]._id,
          serviceType: "Windshield Replacement",
          startDate: new Date("2024-03-10"),
          completionDate: new Date("2024-03-11"),
          technicianAssigned: users[2].firstName,
          status: "Complete",
          tasks: [
            { title: "Remove old windshield" },
            { title: "Install new windshield" },
          ],
          laborHours: 2,
          costOfService: 200,
        },
        {
          carId: car1._id,
          userId: users[0]._id,
          serviceType: "Camshaft Replacement",
          startDate: new Date("2024-03-13"),
          completionDate: new Date("2024-03-14"),
          technicianAssigned: users[0].firstName,
          status: "Complete",
          tasks: [
            { title: "Remove old camshaft" },
            { title: "Install new camshaft" },
          ],
          laborHours: 6,
          costOfService: 600,
        },
      ]);

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
