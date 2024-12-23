const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobTitle: { type: String },
  department: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  hireDate: { type: Date },
  salary: { type: Number },
  dateOfBirth: { type: Date },
  gender: { type: String },
  address: { type: String },
  employmentStatus: { type: String, default: "Active" },
  manager: { type: String },
  password: { type: String, required: true },
});

// Hash the password before saving it
// .methods is allows for operations on individual documents
UserSchema.methods.hashPassword = function () {
  this.password = bcrypt.hashSync(this.password, 10); // Salt the hash
};

// Compare entered password with the stored hashed password
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password); 
};

// Hash the password if it's being created or modified
UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.hashPassword();
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
