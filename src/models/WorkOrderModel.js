const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  description: { type: String },
});

const WorkOrderSchema = new mongoose.Schema({
  carId: { type: String, required: true },
  serviceType: { type: String, required: true },
  startDate: { type: Date, required: true },
  completionDate: { type: Date },
  technicianAssigned: { type: String },
  tasks: [TaskSchema],
  laborHours: { type: Number },
  costOfService: { type: Number },
  workOrderStatus: { type: String, default: "To Do" },
  serviceNotes: { type: String },
  warrantyOnWork: { type: String },
});

const WorkOrder = mongoose.model("WorkOrder", WorkOrderSchema);
module.exports = { WorkOrder};


