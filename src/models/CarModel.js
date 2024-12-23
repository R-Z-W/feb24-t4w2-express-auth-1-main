const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  carId: { type: String, required: true, unique: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true, unique: true },
  licensePlate: { type: String, required: true },
  color: { type: String, required: true },
  engineType: { type: String },
  transmissionType: { type: String },
  mileage: { type: Number },
  fuelType: { type: String },
  price: { type: Number },
  condition: { type: String },
  seatingCapacity: { type: Number },
  drivetrain: { type: String },
  status: { type: String, default: "For Sale" },
  location: { type: String },
  boughtDate: { type: Date },
  soldDate: { type: Date },
});

const Car = mongoose.model("Car", CarSchema);
module.exports = { Car };