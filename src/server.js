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

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Authentication Routes
app.post("/signup", async (req, res) => {
	const { username, password } = req.body;
  
	if (!username || !password) {
	  return res.status(400).json({
		message: "Incorrect or missing sign-up credentials provided.",
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
  
// Login Route - Add this route
app.post("/api/login", async (req, res) => {
	const { username, password } = req.body;
  
	if (!username || !password) {
	  return res.status(400).json({
		message: "Missing login credentials.",
	  });
	}
  
	// Find user by username
	const user = await User.findOne({ username });
  
	if (!user) {
	  return res.status(400).json({
		message: "Invalid username or password.",
	  });
	}
  
	// Compare provided password with stored hashed password
	const isPasswordValid = await bcrypt.compare(password, user.password);
  
	if (!isPasswordValid) {
	  return res.status(400).json({
		message: "Invalid username or password.",
	  });
	}
  
	// Generate JWT token
	const token = generateJWT(user.id, user.username);
	res.json({
	  token,
	  user: {
		id: user.id,
		username: user.username,
	  },
	});
});
  


// // Authentication Routes
// app.post("/signup", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({
//       message: "Incorrect or missing sign-up credentials provided.",
//     });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);  // Hash password before saving
//   let newUser = await User.create({ username, password: hashedPassword });
//   let newJwt = generateJWT(newUser.id, newUser.username);

//   res.json({
//     jwt: newJwt,
//     user: {
//       id: newUser.id,
//       username: newUser.username,
//     },
//   });
// });

// // Login Route - Add this route
// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({
//       message: "Missing login credentials.",
//     });
//   }

//   // Find user by username
//   const user = await User.findOne({ username });

//   if (!user) {
//     return res.status(400).json({
//       message: "Invalid username or password.",
//     });
//   }

//   // Compare provided password with stored hashed password
//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(400).json({
//       message: "Invalid username or password.",
//     });
//   }

//   // Generate JWT token
//   const token = generateJWT(user.id, user.username);
//   res.json({
//     token,
//     user: {
//       id: user.id,
//       username: user.username,
//     },
//   });
// });


  
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
    res.status(400).json({ message: err.message });
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
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/workorders/:id", validateUserAuth, async (req, res) => {
  try {
    await WorkOrder.findByIdAndDelete(req.params.id);
    res.json({ message: "Work Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = {
  app,
};
