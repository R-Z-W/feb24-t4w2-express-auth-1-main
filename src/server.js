const express = require("express");
const { User } = require("./models/UserModel");
const { WorkOrder } = require("./models/WorkOrderModel");
const { generateJWT, validateUserAuth } = require("./functions/jwtFunctions");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());
app.use(cors());

let corsOptions = {
	origin: [
		"http://localhost:3000", 
		"http://127.0.0.1:5173", 
		"https://domain.com"], // Replace with domain
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Health Check Route
app.get("/api/health", (req, res) => {
	res.status(200).json({ message: "Backend is working!" });
});

// Authentication Routes
app.post("/signup", async (req, res) => {
	const { username, password } = req.body;
  
	if (!username || !password) {
	  return res.status(400).json({
		message: "Incorrect or missing sign-up credentials provided.",
	  });
	}
  
	// Password strength validation (example: at least 8 characters, 1 number)
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	if (!passwordRegex.test(password)) {
		return res.status(400).json({
			message: "Password must be at least 8 characters long and contain at least one number.",
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);  // Hash password before saving
	let newUser = await User.create({ username, password: hashedPassword });
	let newJwt = generateJWT(newUser.id, newUser.username);
  
	res.json({
	  jwt: newJwt,
	  user: {
		id: newUser.id,
		username: newUser.username,
	  },
	});
});



  
// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({
          message: "Missing login credentials.",
      });
  }

  // Find user by username
  let user = await User.findOne({ username });
  if (!user) {
      return res.status(401).json({ message: "User not found." });
  }

  // Check if the password matches the hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password); // Use bcrypt.compare() to compare hashes
  console.log("Password match:", isPasswordValid);  // Debugging line
  if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
  }
  

  // Generate JWT
  const token = generateJWT(user._id, user.username);
  res.json({ token });
});




// Work Order Routes
app.get("/api/workorders", validateUserAuth, async (req, res) => {
  const workOrders = await WorkOrder.find();
  res.json(workOrders);
});

app.post("/api/workorders", validateUserAuth, async (req, res) => {
  const workOrder = new WorkOrder(req.body);
  try {
    const newWorkOrder = await workOrder.save();
    res.status(201).json(newWorkOrder);
  } catch (err) {
    console.error(err); // Log the error
    res.status(400).json({ message: "Error creating work order." });
  }
});

app.put("/api/workorders/:id", validateUserAuth, async (req, res) => {
  try {
    const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedWorkOrder);
  } catch (err) {
    console.error(err); // Log the error
    res.status(400).json({ message: "Error updating work order." });
  }
});

app.delete("/api/workorders/:id", validateUserAuth, async (req, res) => {
  try {
    await WorkOrder.findByIdAndDelete(req.params.id);
    res.json({ message: "Work Order deleted" });
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ message: "Error deleting work order." });
  }
});

module.exports = { app };
