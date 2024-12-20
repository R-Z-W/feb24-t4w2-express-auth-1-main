const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  employeeName: { type: String, required: true },
});

const WorkOrderSchema = new mongoose.Schema({
  carId: { type: String, required: true, unique: true },
  carModel: { type: String, required: true },
  carLicensePlate: { type: String, required: true },
  tasks: [TaskSchema],
});

const WorkOrder = mongoose.model("WorkOrder", WorkOrderSchema);

module.exports = {
  WorkOrder,
};
